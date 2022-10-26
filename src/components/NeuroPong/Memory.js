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
     * @returns {Array} // random samples
     */
    sample(nSamples) {
        return sampleSize(this.samples, nSamples);
    }

}