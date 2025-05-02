import { VintageInfoDto } from './vintage-Info.dto';
import { AutoMap } from '@automapper/classes';

export class WineDto {
  @AutoMap()
  readonly id: string;

  @AutoMap()
  readonly name: string;

  @AutoMap()
  readonly category: string;

  @AutoMap()
  readonly country: string;

  @AutoMap()
  readonly region: string;

  @AutoMap()
  readonly producer: string;

  @AutoMap(() => VintageInfoDto)
  readonly vintageInfos: VintageInfoDto[];

  @AutoMap()
  readonly image: string;

  @AutoMap()
  readonly createdOn: Date;

  @AutoMap()
  readonly updatedOn: Date;

  readonly bottleCount: number;
}
