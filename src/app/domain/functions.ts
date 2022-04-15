import { TableSP } from "./interface";

export class xml {

    public static generateXml(spID: number, cCodeProvider: string, plates: TableSP[]): string {
        let provider = this.generateProvider();
        let plateList = this.generatePlateList(plates);
        return `<InfoExchange>
            <infoExchangeContent>
                ${provider}
                <adus>
                    <exceptionListADUs>
                        <ExceptionListADU>
                            <exceptionListVersion>1</exceptionListVersion>
                            <exceptionListType>2</exceptionListType>
                            <exceptionListEntries>
                                ${plateList}
                            </exceptionListEntries>
                        </ExceptionListADU>
                    </exceptionListADUs>
                </adus>
            </infoExchangeContent>
        </InfoExchange>`
    }


    public static encodeCountry(country: string): string {
        return '';
    }

    private static generateProvider(): string {
        return `
        <apci>
			<aidIdentifier>0</aidIdentifier>
			<apduOriginator>
				<countryCode>0110000001</countryCode>
				<providerIdentifier>2</providerIdentifier>
			</apduOriginator>
			<informationSenderID>
				<countryCode>0110000001</countryCode>
				<providerIdentifier>2</providerIdentifier>
			</informationSenderID>
			<informationrecipientID>
				<countryCode>0110000001</countryCode>
				<providerIdentifier>2</providerIdentifier>
			</informationrecipientID>
			<apduIdentifier>794168752</apduIdentifier>
			<apduDate>20220407130008</apduDate>
		</apci>
        `
    }

    private static generatePlateList(plates: TableSP[]): string {
        let list = '';
        plates.forEach(plate => {
            let plateDecode = this.converPlate(plate.plate);
            list += `
            <ExceptionListEntry>
                <userId>
                    <licencePlateNumber>
                        <countryCode>0110000001</countryCode>
                        <alphabetIndicator>
                            <latinAlphabetNo1/>
                        </alphabetIndicator>
                        <licencePlateNumber>${plateDecode}</licencePlateNumber>
                    </licencePlateNumber>
                </userId>
                <statusType>3</statusType>
                <reasonCode>8</reasonCode>
            </ExceptionListEntry>
            `
        });
        return list
    }

    private static converPlate(plate: string): string {
        let bytes: string = '';
        for (var i = 0; i < plate.length; ++i) {
            let code = plate.charCodeAt(i).toString(16);
            bytes += code;
        }
        return bytes
    }
}