import { TableSP } from "./interface";

export class xml {
    private static countryCodeAlphabet: Map<string, number> = this.initAlphabet();
    private static possible : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static generateXml(spID: number, cCodeProvider: string, plates: TableSP[]): string {
        let provider = this.generateProvider();
        let plateList = this.generatePlateList(plates);
        return `
        <InfoExchange>
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

    public static encodeCountry(country: string): string {
        if (this.countryCodeAlphabet.size == 0)
            this.initAlphabet();
        if(!country || country.length != 2) {
             // TODO  FAIL
        }
        country = country.toUpperCase();
        const first = this.countryCodeAlphabet.get(country[0]);
        const second = this.countryCodeAlphabet.get(country[1]);
        let res = 0;
        if (first && second) {
            res = (res | first << 11);
            res = (res | second << 6);
        } else {
            // TODO  FAIL
        }
        res = res >> 6;
        const alf = (0 & 0x3F);
        res = (res | alf);
        res = res & 0x3FF;
        return this.pad(this.dec2bin(res), 10);
    }

    private static pad(byteStr : string, size: number) : string{
        while (byteStr.length < size) byteStr = "0" + byteStr;
        return byteStr;
    }

    private static dec2bin(dec: number): string {
        return (dec >>> 0).toString(2);
    }

    private static initAlphabet() : Map<string, number> {
        let countryCodeAlphabet: Map<string, number> = new Map<string, number>();
        countryCodeAlphabet.set('A', 24);
        countryCodeAlphabet.set('B', 19);
        countryCodeAlphabet.set('C', 14);
        countryCodeAlphabet.set('D', 18);
        countryCodeAlphabet.set('E', 16);
        countryCodeAlphabet.set('F', 22);
        countryCodeAlphabet.set('G', 11);
        countryCodeAlphabet.set('H', 5);
        countryCodeAlphabet.set('I', 12);
        countryCodeAlphabet.set('J', 26);
        countryCodeAlphabet.set('K', 30);
        countryCodeAlphabet.set('L', 9);
        countryCodeAlphabet.set('M', 7);
        countryCodeAlphabet.set('N', 6);
        countryCodeAlphabet.set('O', 3);
        countryCodeAlphabet.set('P', 13);
        countryCodeAlphabet.set('Q', 29);
        countryCodeAlphabet.set('R', 10);
        countryCodeAlphabet.set('S', 20);
        countryCodeAlphabet.set('T', 1);
        countryCodeAlphabet.set('U', 28);
        countryCodeAlphabet.set('V', 15);
        countryCodeAlphabet.set('W', 25);
        countryCodeAlphabet.set('X', 23);
        countryCodeAlphabet.set('Y', 21);
        countryCodeAlphabet.set('Z', 17);
        return countryCodeAlphabet;
    }

    public static generateRandomPlate(): string {
        let plate: string = "";
        for (var i = 0; i < 7; i++) {
            if (i < 2 || i > 4) {
                plate += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
            } else {
                plate += Math.floor(Math.random() * 10);
            }
        }
        return plate;
    }
}