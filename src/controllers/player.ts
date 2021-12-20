import { Request, Response } from 'express';
import Controller from '../decorators/controller';
import { Get, Post } from '../decorators/handler';
import { routeLogging, logIndex } from '../decorators/logging';

@logIndex
@Controller('/players')
export default class PlayerController {
  private cats: Array<{ name: string }> = [
    { name: 'Roger Federer' },
    { name: 'Rafael Nadal' },
  ];

  @routeLogging()
  @Get('')
  public index(req: Request, res: Response): void {
    res.json({ cats: this.cats });
  }

  @routeLogging()
  @Post('')
  public add(req: Request, res: Response): void {
    this.cats.push(req.body);
    res.status(204).json();
  }

  @routeLogging()
  @Get('/:name')
  public findByName(req: Request, res: Response): unknown {
    const { name } = req.params;
    const foundCat = this.cats.find((c) => c.name === name);
    if (foundCat) {
      return res.json({ cat: foundCat });
    }
    return res.status(404).json({ message: 'Player not found!' });
  }
}