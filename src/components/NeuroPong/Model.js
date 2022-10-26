import { 
    layers,
    LayersModel, 
    sequential, 
    Tensor, 
    tidy
} from "@tensorflow/tfjs";

export class Model {
    /**
     * @param {number} nStates
     * @param {number} nActions
     * @param {number} batchSize
     */

    constructor(hiddenLayerSizesOrModel, nStates, nActions, batchSize) {
        this.nStates = nStates;
        this.nActions = nActions;
        this.batchSize = batchSize;

        if (hiddenLayerSizesOrModel instanceof LayersModel) {
            this.network = hiddenLayerSizesOrModel;
            this.network.summary();
            this.network.compile({
                optimizer: "adam",
                loss: "meanSquaredError"
            });
        } else {
            this.defineModel(hiddenLayerSizesOrModel);
        }
    }

    defineModel(hiddenLayerSizes) {
        if(!Array.isArray(hiddenLayerSizes)) {
            hiddenLayerSizes = [hiddenLayerSizes];
        }

        this.network = sequential();
        hiddenLayerSizes.forEach((hiddenLayerSize, i) => {
            this.network.add(
                layers.dense({
                    units: hiddenLayerSize,
                    activation: 'relu',
                    // inputShape only required for first layer
                    inputShape: i === 0 ? [this.nStates] : undefined
                })
            );
        });
        this.network.add(layers.dense({ units: this.nActions }));
        this.network.compile({
            optimizer: "adam",
            loss: "meanSquaredError"
        });
    }

    /**
     * @param {Tensor | Tensor[]} states 
     * @returns {Tensor | Tensor[]}
     */
    predict(states) {
        return tidy(() => this.network.predict(states));
    }

    /**
     * @param {Tensor[]} xBatch 
     * @param {Tensor[]} yBatch 
     */
    async train(xBatch, yBatch) {
        await this.network.fit(xBatch, yBatch)
    }

    /**
     * @param {Tensor} state 
     * @param {number} eps 
     * @returns {number} The action chosen by the model in {-1, 0, 1}
     */
    chooseAction(state, eps) {
        if (Math.random() < eps) {
            return Math.floor(Math.random() * this.nActions) - 1;
        } else {
            return tidy(() => {
                return this.network.predict(state).argMax(1).dataSync()[0] - 1
            });
        }
    }
}