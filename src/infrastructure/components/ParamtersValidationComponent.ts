import LoggerComponent from "./LoggerComponent";

export default class ParamtersValidationComponent {
    private static logger = new LoggerComponent();

    public static allParamtersRequired(object: any, paramsters: string[]): boolean{

        for (let i = 0; i < paramsters.length; i++) {
            const element = paramsters[i];
            const attribute = object[element];

            if(attribute === undefined) {
                ParamtersValidationComponent.logger.warn(`Attribute value in object is undefined. Attribute: ${element}`);
                throw new Error (`Attribute value in object is undefined. Attribute: ${element}`);
            }
        }
        return true;
    }
}