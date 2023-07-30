import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table
class Integration extends Model {
  @Column(DataType.TEXT)
  provider: string;

  @Column(DataType.INTEGER)
  created_at: number;

  @Column(DataType.TEXT)
  message: string;

  @Column(DataType.TEXT)
  link: string;

  @Column(DataType.TEXT)
  metadata: string
}

export default Integration;