
/*
a) чтения порции данных с возможностью задания limit, offset, sortOrder, sortField
b) чтение по id, проверка является ли id числом
c) создание записи, с валидацией через joi - поля не пустые
d) обновление записи по id с валидацией через joi
e) удаление записи по id, с отвязкой агентов
f) чтение привязанных агентов по id офиса с возможностью задания limit, offset
*/

const CrudService = require('./crud');
const validator = requre('../helpers/validator.js');

class OfficeService extends CrudService {
    constructor(officeRepository, agentRepository, shema, errors){
        super(officeRepository, errors);
        this.shema = shema;
        this.agentRepository = agentRepository;
    }
    async create(data){
        let valid = validator(this.shema, data);
        if(!valid.isValid)
            throw this.errors.validError(valid.errors);
        super.create(data);
    }
    async update(id, data){
        let valid = validator(this.shema, data);
        if(!valid.isValid)
            throw this.errors.validError(valid.errors);
        super.update(id, data);
    }
    async delete(id) {
		await super.read(id);
		await this.agentsRepository.update(
			{officeId: null},
			{where: {officeId: id}}
		);
		return await super.delete(id);
	}
    async readAgent(id, options){
        const office = await this.read(id);
        return await super.readChunk({
            limit: Number(options.limit) || this.defaults.readChunk.limit,
            page: Number(options.page) || this.defaults.readChunk.page
        },
        this.agentRepository, 
        {id: office.officeId});
    }
}