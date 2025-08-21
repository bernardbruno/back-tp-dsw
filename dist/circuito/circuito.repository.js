import { Circuito } from "./circuito.entity.js";
const circuitos = [
    new Circuito("1", "Circuit de Spa-Francorchamps", "Stavelot", "Bélgica", 44, 7.004),
    new Circuito("2", "Circuit de Spa-Francorchamps20", "Stavelot", "Bélgica", 44, 7.004),
    new Circuito("3", "Circuit de Spa-Francorchamps30", "Stavelot", "Bélgica", 44, 7.004),
    new Circuito("4", "Circuit de Spa-Francorchamps40", "Stavelot", "Bélgica", 44, 7.004)
];
export class CircuitoRepository {
    findAll() {
        return circuitos;
    }
    findOne(item) {
        return circuitos.find((circuito) => circuito.id === item.id);
    }
    add(item) {
        circuitos.push(item);
        return item;
    }
    update(item) {
        const circuitoIndex = circuitos.findIndex((circuito) => circuito.id === item.id);
        if (circuitoIndex !== -1) {
            Object.assign(circuitos[circuitoIndex], item);
        }
        return circuitos[circuitoIndex];
    }
    delete(item) {
        const circuitoIndex = circuitos.findIndex((circuito) => circuito.id === item.id);
        if (circuitoIndex !== -1) {
            const output = circuitos[circuitoIndex];
            circuitos.splice(circuitoIndex, 1);
            return output;
        }
    }
}
//# sourceMappingURL=circuito.repository.js.map