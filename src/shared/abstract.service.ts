import { Repository } from "typeorm";

export class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}
  async save(options) {
    return this.repository.save(options);
  }

  async find(options = {}) {
    return this.repository.find(options);
  }

  async findOne(options) {
    return this.repository.findOne({ where: options });
  }

  async update(id: string, options) {
    return this.repository.update(id, options);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
