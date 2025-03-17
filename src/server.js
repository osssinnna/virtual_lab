
import {substancesInfo} from './data';

export function formatChemicalFormula(formul) {
  
    let formulaString = "";

    if (formul.koef != 1) {
        formulaString += formul.koef;
    }
    // Добавляем первый элемент
    formulaString += formul.first;
    if (formul.indexFirst != 1) {
        formulaString += formul.indexFirst;
    }

    // Добавляем второй элемент
    if (formul.second) {
        formulaString += formul.second;
        if (formul.indexSecond != 1) {
            formulaString += formul.indexSecond;
        }
    }

    // Добавляем третий элемент
    if (formul.third) {
        formulaString += formul.third;
        if (formul.indexThird != 1) {
            formulaString += formul.indexThird;
        }
    }
    console.log("this is formulasting" + formulaString);
    return formulaString;
}


export function ionExchangeReaction(substance1, substance2, callback) {
    console.log("Ion exchange reaction function called");
    function splitIntoIons(substance) {
      console.log("Splitting into ions:", substance);
      const ions = substance.match(/[A-Z][a-z]*\d*/g);
      const cation = ions[0];
      const anions = ions.slice(1); // Остальные ионы
      return [cation, anions];
    }
    console.log(substance2);
    const ions1 = splitIntoIons(substance1);
    const ions2 = splitIntoIons(substance2);

    const cation1 = ions1[0];
    const anions1 = ions1[1];
    const cation2 = ions2[0];
    const anions2 = ions2[1];
    console.log(anions2);
    // Объединяем катионы и анионы в новые вещества
    let newSubstance1 = cation1 + anions2.join("");
    let newSubstance2 = cation2 + anions1.join("");
    let flag1 = false;
    let flag2 = false
    substancesInfo.forEach((element) => {
        if(element.formul.string == newSubstance1) {
            return flag1 = true;
        } 
        if (element.formul.string == newSubstance2) {
            return flag2 = true;
        }
    })

    if (flag1 == false) {
        const newSubstanceObjectOne = parseChemicalFormula(newSubstance1);
        substancesInfo.forEach((element) => {
            if(element.formul.first == newSubstanceObjectOne.first &&
                element.formul.second == newSubstanceObjectOne.second &&
                element.formul.third == newSubstanceObjectOne.third) {
                    newSubstanceObjectOne.indexFirst =element.formul.indexFirst;
                    newSubstanceObjectOne.indexSecond =element.formul.indexSecond;
                    newSubstanceObjectOne.indexThird =element.formul.indexThird ;
            }
        })
        newSubstance1 = formatChemicalFormula(newSubstanceObjectOne);
    }
    if (flag2 == false) {
        const newSubstanceObjectTwo = parseChemicalFormula(newSubstance2);
        substancesInfo.forEach((element) => {
            if(element.formul.first == newSubstanceObjectTwo.first &&
                element.formul.second == newSubstanceObjectTwo.second &&
                element.formul.third == newSubstanceObjectTwo.third) {
                    newSubstanceObjectTwo.indexFirst =element.formul.indexFirst;
                    newSubstanceObjectTwo.indexSecond =element.formul.indexSecond;
                    newSubstanceObjectTwo.indexThird =element.formul.indexThird ;
            }
        })
        newSubstance2 = formatChemicalFormula(newSubstanceObjectTwo);
    }
    const reactionsFormul = [substance1, substance2, newSubstance1, newSubstance2];
    callback(reactionsFormul);
  }


export function balanceReaction(reactionFormul) {
    const newFormulObject = reactionFormul.map((value) => {
      return parseChemicalFormula(value);
    })
    
  const result = newFormulObject.map((value) =>{
    return formatChemicalFormula(value);
  })

  return result[0] + "+" + result[1] + "->" + result[2] + "+" + result[3];
}



export function directSubstance(formulaString) {
    // Создаем новый объект на основе результата парсинга
    let chem = { formul: parseChemicalFormula(formulaString) };
    substancesInfo.forEach((element) => {
        if (element.formul.first === chem.formul.first &&
            element.formul.second === chem.formul.second &&
            element.formul.third === chem.formul.third) {
            if (element.aggregate === "gas") {
                // Добавляем стрелку вверх к формуле, если вещество - газ
                //chem.formul.string = element.formul.string + "↑";
                formulaString = formulaString + "↑";
            } else if (element.aggregate === "powder" || element.aggregate === "cristal") {
                // Добавляем стрелку вниз к формуле, если вещество - осадок
                // chem.formul.string = element.formul.string + "↓";
                formulaString = formulaString + "↓";
            }
        }
    });
    return formulaString;
}


export function parseChemicalFormula(formulaString) {
    const regex = /([A-Z][a-z]*)(\d*)/g; // Регулярное выражение для извлечения элементов и их индексов из строки формулы
    let match;
    const formul = {
        koef: 1,
        first: "",
        indexFirst: "",
        second: "",
        indexSecond: "",
        third: "",
        indexThird: ""
    };

    let index = 0; // Счетчик для отслеживания, сколько элементов мы уже добавили

    while ((match = regex.exec(formulaString)) !== null) {
        const [, element, indexString] = match; // Разбираем соответствие на элемент и индекс
        const indexKey = `index${index === 0 ? "First" : index === 1 ? "Second" : "Third"}`; // Определяем ключ для сохранения индекса в зависимости от того, сколько элементов мы уже добавили
        formul[index === 0 ? "first" : index === 1 ? "second" : "third"] = element; // Сохраняем элемент в зависимости от того, сколько элементов мы уже добавили
        formul[indexKey] = indexString || "1"; // Если индекс отсутствует, присваиваем "1"
        index++; // Увеличиваем счетчик элементов
    }
    console.log(formul);
    return formul;
  }



export function parseUserData(coef1, subOne, coef2, subTwo, coef3, subThree, coef4, subFour) {
    let flag1 = false;
    let flag2 = false
    let balance = true;
    substancesInfo.forEach((element) => {
        if(element.formul.string == subThree) {
            console.log("Krosh");
            return flag1 = true;
        } 
        if (element.formul.string == subFour) {
            console.log("Nusha");
            return flag2 = true;
        }
    })
    balance = true;
    // if (flag1 == false || flag2 == false) {
    //     balance = false;
    // } else {
    //     let element1 = parseChemicalFormula(subOne);
    //     let element2 = parseChemicalFormula(subTwo);
    //     let element3 = parseChemicalFormula(subThree);
    //     let element4 = parseChemicalFormula(subFour);
    //     let arrayReagent= [{name: element1.first, index: element1.indexFirst}, //0
    //                         {name: element1.second, index: element1.indexSecond}, //1
    //                         {name: element1.third, index: element1.indexThird}, //2

    //                         {name: element2.first, index: element2.indexFirst}, //3
    //                         {name: element2.second, index: element2.indexSecond}, //4
    //                         {name: element2.third, index: element2.indexThird} //5
    //                     ]

    //     let arrayResult= [{name: element3.first, index: element3.indexFirst}, //0
    //                         {name: element3.second, index: element3.indexSecond}, //1
    //                         {name: element3.third, index: element3.indexThird}, //2

    //                         {name: element4.first, index: element4.indexFirst}, //3
    //                         {name: element4.second, index: element4.indexSecond}, //4
    //                         {name: element4.third, index: element4.indexThird} //5
    //                     ]
    //     arrayReagent.forEach((elem, index) => {
    //         arrayResult.forEach((res, jndex) => {
    //             if ((elem.name === res.name)) {
    //                 if (index < 3) {
    //                     if (jndex < 3) {
    //                         if (coef1 * elem.index != coef3 * res.index) {
    //                             balance = false;
    //                         }
    //                     } else {
    //                         if (coef1 * elem.index != coef4 * res.index) {
    //                             balance = false;
    //                         }
    //                     }
    //                 } else {
    //                     if (jndex < 3) {
    //                         if (coef2 * elem.index != coef3 * res.index) {
    //                             balance = false;
    //                         }
    //                     } else {
    //                         if (coef2 * elem.index != coef4 * res.index) {
    //                             balance = false;
    //                         }
    //                     }
    //                 }
    //             }
    //         })
    //     })
    // } 
    return balance;
}


// function grammaticalElementAnalysis(element) {
//     // Проверка символов
//     const regExp = /^[A-Z][a-z]?$/;
//     if (!regExp.test(element)) {
//         return { error: true, message: "Ошибка, неверно введены символы в элементе, используйте латинские буквы, первая буква элемента в верхнем регистре" };
//     }

//     // Проверка существования элемента
//     const elementExists = elements.find(el => el.symbol === element);
//     if (!elementExists) {
//         return { error: true, message: `Ошибка, введен несуществующий элемент ${element}, попробуйте снова` };
//     }

//     return { error: false };
// }

// function grammaticalSubstanceAnalysis(substance) {
//     // Деление вещества на элемент и индекс
//     const element = substance.match(/[A-Z][a-z]?/)[0];
//     const index = parseInt(substance.match(/\d+/) || 1);

//     const grammaticalAnalysisResult = grammaticalElementAnalysis(element);
//     if (grammaticalAnalysisResult.error) {
//         return grammaticalAnalysisResult;
//     }

//     if (index <= 0 || isNaN(index)) {
//         return { error: true, message: `Ошибка, введен неверное количество атомов у элемента ${element}, попробуйте снова` };
//     }

//     return { error: false };
// }

// function semanticSubstanceAnalysis(substance) {
//     // Парсинг вещества на катион и анион
//     const cation = substance.substring(0, substance.search(/[^A-Za-z]/));
//     const anion = substance.substring(substance.search(/[^A-Za-z]/));

//     // Грамматический анализ катиона
//     const cationAnalysisResult = grammaticalSubstanceAnalysis(cation);
//     if (cationAnalysisResult.error) {
//         return cationAnalysisResult;
//     }

//     // Грамматический анализ аниона
//     const anionAnalysisResult = grammaticalSubstanceAnalysis(anion);
//     if (anionAnalysisResult.error) {
//         return anionAnalysisResult;
//     }

//     // Проверка соответствия типов веществ (пример)
//     // Взаимодействие с массивом substanceInfo
//     const cationType = substanceInfo.find(item => item.name === cation)?.type;
//     const anionType = substanceInfo.find(item => item.name === anion)?.type;

//     if (cationType !== 'cation' || anionType !== 'anion') {
//         return { error: true, message: "Ошибка, некорректное соединение катиона и аниона" };
//     }

//     // Проверка валентностей элементов (пример)
//     // Взаимодействие с массивом elements
//     const cationElement = elements.find(el => el.symbol === cation.match(/[A-Z][a-z]?/)[0]);
//     const anionElement = elements.find(el => el.symbol === anion.match(/[A-Z][a-z]?/)[0]);

//     if (cationElement.valency !== anionElement.valency) {
//         return { error: true, message: "Ошибка, несоответствие валентностей элементов катиона и аниона" };
//     }

//     // Дополнительные проверки и валидации

//     return { error: false };
// }

// function semanticReactionAnalysis(firstReactant, secondReactant, firstProduct, secondProduct) {
//     // Грамматический анализ всех входных веществ
//     const reactant1AnalysisResult = grammaticalSubstanceAnalysis(firstReactant);
//     if (reactant1AnalysisResult.error) {
//         return reactant1AnalysisResult;
//     }

//     const reactant2AnalysisResult = grammaticalSubstanceAnalysis(secondReactant);
//     if (reactant2AnalysisResult.error) {
//         return reactant2AnalysisResult;
//     }

//     const product1AnalysisResult = grammaticalSubstanceAnalysis(firstProduct);
//     if (product1AnalysisResult.error) {
//         return product1AnalysisResult;
//     }

//     const product2AnalysisResult = grammaticalSubstanceAnalysis(secondProduct);
//     if (product2AnalysisResult.error) {
//         return product2AnalysisResult;
//     }

//     // Проверка уместности веществ по типу соединения (пример)
//     // Взаимодействие с массивом substanceInfo
//     const reactantsType = `${substanceInfo.find(item => item.name === firstReactant)?.type}-${substanceInfo.find(item => item.name === secondReactant)?.type}`;
//     const productsType = `${substanceInfo.find(item => item.name === firstProduct)?.type}-${substanceInfo.find(item => item.name === secondProduct)?.type}`;

//     if (reactantsType !== productsType) {
//         return { error: true, message: "Ошибка, несоответствие типов реагентов и продуктов" };
//     }

//     // Дополнительные проверки и валидации

//     return { error: false };
// }