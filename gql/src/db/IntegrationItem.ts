import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table
class IntegrationItem extends Model {
  @Column(DataType.TEXT)
  provider: string;

  @Column(DataType.INTEGER)
  created_at: number;

  @Column(DataType.DATE)
  completed_at: number | null;

  @Column(DataType.INTEGER)
  ingester_item_id: number;

  @Column(DataType.TEXT)
  label: string;

  @Column(DataType.TEXT)
  citation: string;
}

export default IntegrationItem;