import { sampleSize } from "lodash";

export class Memory {
    /**
     * @param {number} maxMemory
     */
    constructor(maxMemory) {
        this.maxMemory = maxMemory;
        this.samples = [];
    }

    /**
     * @param {Array} sample 
     */
    addSample(sample) {
        this.samples.push(sample);
        if (this.samples.length > this.maxMemory) {
            this.samples.shift();
        }
    }

    /**
     * @param {number} nSamples 
     * @param {number} gamma
     * @returns {Array} // random samples
     */
    sample(nSamples, gamma) {
        // spread rewards before sampling
        const rewards = this.samples.map(
            ([, , reward, ]) => reward
        );
        const mean = rewards.reduce(
            (mean, r, idx, rwds) => mean + r/rwds.length, 0
        );
        const variance = rewards.reduce(
            function(variance, r, idx, rwds) {
                return variance + Math.pow(r - mean, 2) / rwds.length
            }, 0);
        const standardDeviation = Math.sqrt(variance);

        let running_sum = 0;
        let discountedRewards = new Array(rewards.length).fill(0);
        for(let i = rewards.length - 1; i >= 0; --i) {
            if (rewards[i] !== 0) {
                running_sum = 0;
            }
            running_sum += gamma * rewards[i];
            discountedRewards[i] = (
                (running_sum - mean) / standardDeviation
            );
        }

        const newSample = this.samples.map(
            ([state, action, , nextState], idx) => {
                return (
                    [state, action, discountedRewards[idx], nextState]
                );
            }
        )

        return sampleSize(newSample, nSamples);
    }

}