import { Controller, Get, Route, SuccessResponse } from 'tsoa'

@Route('healthcheck')
export class HealthcheckController extends Controller {
    @Get('/')
    @SuccessResponse(200, 'Healthcheck')
    public async healthcheck(): Promise<string> {
        return 'healthy'
    }
}
