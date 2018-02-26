/*
a) чтения порции данных с возможностью задания limit, offset, sortOrder, sortField
b) чтение по id, проверка является ли id числом
c) создание записи, с валидацией через joi - email - адрес почты, оставшиеся поля не пустые
d) обновление записи по id с валидацией через joi
e) удаление записи по id, с отвязкой недвижимости
f) привязка к офису
g) отвязка от офиса
h) чтение привязанной недвижемости по id агента с возможностью задания limit, offset
*/

const CrudService = require('./crud');
const validator = requre('../helpers/validator.js');

class AgentServices extends CrudService{
    constructor(agentRepos, officeRepos, shema, errors) {
        super(agentRepos, errors);
        this.shema = shema;
        this.officeRepos = officeRepos;
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
    async delete(id){
        await removeOffice(id);
        return await super.delete(id);
    }
    async addOffice(id, officeId){
        let office = this.officeRepos.findById(officeId, {raw:true});
        let beforeProp = super.read(id);
        if(!agent || !beforeProp){
            this.errors.notFound;
        }
        return await super.update(id, {...beforeProp, officeId: office.id});
    }
    async removeOffice(id){
        let beforeProp = super.read(id);
        return await super.update(id, {...beforeProp, officeId: null});
    }
    async readOffice(id, options){
        const agent = await this.read(id);
        return await super.readChunk({
            limit: Number(options.limit) || this.defaults.readChunk.limit,
            page: Number(options.page) || this.defaults.readChunk.page
        },
        this.officeRepos, 
        {id: agent.officeId});
    }
}