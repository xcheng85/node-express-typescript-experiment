import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Controller from '../decorators/controller';
import { Get, Post } from '../decorators/handler';
import { routeLogging, logIndex } from '../decorators/logging';
import HttpError from '../utils/error';

@logIndex
@Controller('/players')
export default class PlayerController {
  private players: Array<{ name: string }> = [
    { name: 'Roger Federer' },
    { name: 'Rafael Nadal' },
  ];

  @routeLogging()
  @Get('')
  public index(req: Request, res: Response): void {
    throw new HttpError('fff', StatusCodes.BAD_REQUEST);
    res.json({ players: this.players });
  }

  @routeLogging()
  @Post('')
  public add(req: Request, res: Response): void {
    this.players.push(req.body);
    res.status(204).json();
  }

  @routeLogging()
  @Get('/:name')
  public findByName(req: Request, res: Response): unknown {
    const { name } = req.params;
    const foundPlayer = this.players.find((c) => c.name === name);
    if (foundPlayer) {
      return res.json({ player: foundPlayer });
    }
    return res.status(404).json({ message: 'Player not found!' });
  }
}