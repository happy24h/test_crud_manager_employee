import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from './schemas/employee.schemas';
import aqp from 'api-query-params';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private EmployeeModel: mongoose.Model<Employee>,
  ) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    return this.EmployeeModel.create({
      ...createEmployeeDto,
    });
  }

  // count posts
  async countPosts(): Promise<number> {
    return this.EmployeeModel.countDocuments().exec();
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;

    // Tạo biểu thức chính quy để tìm kiếm từng từ trong trường "name"
    const nameSearchRegex = new RegExp(filter.name, 'i');

    // Thêm điều kiện tìm kiếm "name" bằng biểu thức chính quy
    filter.name = nameSearchRegex;

    // email ...
    const emailSearchRegex = new RegExp(filter.email, 'i');
    filter.email = emailSearchRegex;

    const totalItems = (await this.EmployeeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.EmployeeModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage, // Trang hiện tại
        pageSize: limit, // Số lượng bản ghi đã lấy
        pages: totalPages, // Tổng số trang với điều kiện query
        total: totalItems, // Tổng số phần tử (số bản ghi)
      },
      result, // Kết quả query
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'not found employee';
    }
    return await this.EmployeeModel.findById(id);
  }

  async update(_id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updated = await this.EmployeeModel.updateOne(
      { _id },
      {
        ...updateEmployeeDto,
      },
    );
    return updated;
  }

  async remove(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return 'not found employee';
    }

    const deletedEmployee = await this.EmployeeModel.findByIdAndDelete(_id);

    if (!deletedEmployee) {
      return 'not found employee';
    }

    return deletedEmployee;
  }
}
