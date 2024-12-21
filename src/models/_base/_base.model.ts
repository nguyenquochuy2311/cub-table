import { primaryUlidID } from '@/utils/sequelize.util';
import { Column, CreatedAt, Model, PrimaryKey, UpdatedAt } from 'sequelize-typescript';
import { _IBaseModel } from './_base.interface';

export class _BaseModel extends Model implements _IBaseModel {
	@PrimaryKey
	@Column(primaryUlidID)
	declare id: string;

	@CreatedAt
	@Column({ allowNull: false })
	declare createdAt: Date;

	@UpdatedAt
	@Column({ allowNull: false })
	declare updatedAt: Date;
}
