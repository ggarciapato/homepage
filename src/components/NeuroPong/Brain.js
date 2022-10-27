import { tensor2d, zeros } from "@tensorflow/tfjs";
// import { Model } from "./Model";
// import { Memory } from "./Memory";
// import { Ball, Field, Paddle } from "./Game";

// const MIN_EPSILON = 0.01;
const MAX_EPSILON = 0.1;
//const LAMBDA = 0.01;
const discountRate = .5;

export class Brain {
    /**
     * 
     * @param {Model} model 
     * @param {Memory} memory 
     */
    constructor(model, memory) {
        this.model = model;
        this.memory = memory;
        this.eps = MAX_EPSILON;
        this.discountRate = discountRate;

    }

    /**
     * 
     * @param {Paddle} self 
     * @param {Paddle} other 
     * @param {Ball} ball 
     * @param {Field} field
     * @returns 
     */
    perceive(self, other, ball, field) {
        return tensor2d([[
            self.y / field.canvasHeight, 
            other.y / field.canvasHeight, 
            ball.position.x / field.canvasWidth,
            ball.position.y / field.canvasHeight
        ]]);
    }

    /**
     * 
     * @param {Paddle} self 
     * @param {Paddle} other 
     * @param {Ball} ball 
     * @param {Field} field
     * @returns 
     */
    think(self, other, ball, field) {
        // console.log('THINK');
        const state = this.perceive(self, other, ball, field);
        const action = this.model.chooseAction(state, this.eps);
        self.move(action);
        const reward = self.score - self.other_score;
        const nextState = this.perceive(self, other, ball, field);

        this.memory.addSample([state, action, reward, nextState]);
        // this.eps = MIN_EPSILON + (this.eps - MIN_EPSILON) * Math.exp(-LAMBDA);
    }

    async replay() {
        // Sample from memory
        const batch = this.memory.sample(this.model.batchSize, .5);
        const states = batch.map(([state, , , ]) => state);
        const nextStates = batch.map(([, , , nextState]) => {
            return nextState ? nextState : zeros([this.model.nStates])
        });

        // Predict the values of each action at each state
        const qsa = states.map((state) => this.model.predict(state));
        // Predict the values of each action at each next state
        const qsad = nextStates.map((nextState) => {
            return this.model.predict(nextState)
        });

        let x = [];
        let y = [];

        // Update the states rewards with the discounted next states rewards
        batch.forEach(
            ([state, action, reward, nextState], index) => {
                const currentQ = qsa[index];
                currentQ[action] = (
                    nextState 
                    ? reward + (
                        this.discountRate * qsad[index].max().dataSync() 
                    )
                    : reward
                );
                x.push(state.dataSync());
                y.push(currentQ.dataSync());
            }
        );
        // 

        // Clean unused tensors
        qsa.forEach((state) => state.dispose());
        qsad.forEach((state) => state.dispose());

        // Reshape the batches to be fed to the network
        x = tensor2d(x, [x.length, this.model.nStates]);
        y = tensor2d(y, [y.length, this.model.nActions]);
        // Learn the Q(s, a) values given associated discounted rewards
        await this.model.train(x, y);

        // x.dispose();
        // y.dispose();
    }
}