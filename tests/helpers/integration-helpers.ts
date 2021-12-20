import * as express from 'express';
import {App} from '../../src/app';

export default class IntegrationHelpers {
    public static appInstance: express.Application;
    public static async getApp(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }
        const app: App = new App();
        this.appInstance = app.instance;
        return this.appInstance;
    }
}