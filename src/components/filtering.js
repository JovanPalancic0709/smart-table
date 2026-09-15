import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)
        .forEach((elementName) => {
            elements[elementName].append(
                ...Object.values(indexes[elementName])
                    .map(name => {
                        const filterOption = document.createElement('option');
                        filterOption.value = name;
                        filterOption.textContent = name;
                        return filterOption;

                    })
            );
        });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const clearInputParent = action.parentElement;
            const clearInput = clearInputParent.querySelector('input');

            if (clearInput) {
                clearInput.value = '';
            }
            const fieldName = action.dataset.field;
            if (fieldName && state[fieldName]) {
                state[fieldName] = '';
            }
            

        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}