import { Repository } from "../shared/db/repository.js";
import { Circuito } from "./circuito.entity.js";
/*
const circuitos = [
    new Circuito(
        "1",
        "Circuit de Spa-Francorchamps",
        "Stavelot",
        "Bélgica",
        44,
        7.004
    ),
    new Circuito(
        "2",
        "Circuit de Spa-Francorchamps20",
        "Stavelot",
        "Bélgica",
        44,
        7.004
    ),
    new Circuito(
        "3",
        "Circuit de Spa-Francorchamps30",
        "Stavelot",
        "Bélgica",
        44,
        7.004
    ),
    new Circuito(
        "4",
        "Circuit de Spa-Francorchamps40",
        "Stavelot",
        "Bélgica",
        44,
        7.004
    )
]

export class CircuitoRepository implements Repository<Circuito>{

    public findAll(): Circuito[] | undefined {
        return circuitos
    }

    public findOne(item: {id: string}): Circuito | undefined {
        return circuitos.find((circuito)=> circuito.id === item.id)
    }

    public add(item: Circuito): Circuito | undefined {
        circuitos.push(item)
        return item
    }

    public update(item: Circuito): Circuito | undefined {
        const circuitoIndex = circuitos.findIndex((circuito)=> circuito.id === item.id)
        
        if(circuitoIndex !== -1){
            Object.assign(circuitos[circuitoIndex], item)
        }
        return circuitos[circuitoIndex]
    }

    public delete(item: {id: string}): Circuito | undefined {

        const circuitoIndex = circuitos.findIndex((circuito) => circuito.id === item.id)
    
        if (circuitoIndex !== -1){
            const output = circuitos[circuitoIndex]
            circuitos.splice(circuitoIndex, 1)
            return output
        }
    }
}/*/