
const CrudService = require('./crud');
const validator = requre('../helpers/validator.js');

/*
a) чтения порции данных с возможностью задания limit (от 5 до 25 с шагом 5), offset, sortOrder, sortField
b) чтение по id, проверка является ли id числом
c) создание записи, с валидацией через joi - price больше 0, currency - BYN, USD или EUR, 
оставшиеся поля не пустые
d) обновление записи по id с валидацией через joi
e) удаление записи по id
f) привязка агента
g) отвязка агента
*/

class PropertiesService extends CrudService {
    constructor(propertiesRepository, agentRepository, shema, errors){
        super(propertiesRepository, errors);
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
    async bindAgent(id, agentId){
        const agent = this.agentRepository.findById(agentId, {raw:true});
        const beforeProp = super.read(id);
        if(!agent || !beforeProp){
            this.errors.notFound;
        }
        return await super.update(id, {...beforeProp, agentId: agent.id});
    }

    async unbindAgent(id){
        const beforeProp = await super.read(id);
        return await super.update(id, {...beforeProp, agentId: null});
    }
}