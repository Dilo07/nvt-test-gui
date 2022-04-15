import { TableSP } from "./interface";

export class xml {

    public static generateXml(spID: number, cCodeProvider: string, plates: TableSP[]): string {
        return `
        <InfoExchange>
            <infoExchangeContent>
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
                        <providerIdentifier>48</providerIdentifier>
                    </informationrecipientID>
                    <apduIdentifier>794168752</apduIdentifier>
                    <apduDate>20220407130008</apduDate>
                </apci>
                <adus>
                    <exceptionListADUs>
                        <ExceptionListADU>
                            <exceptionListVersion>1</exceptionListVersion>
                            <exceptionListType>2</exceptionListType>
                            <exceptionListEntries>
                                <ExceptionListEntry>
                                    <userId>
                                        <licencePlateNumber>
                                            <countryCode>0110000001</countryCode>
                                            <alphabetIndicator>
                                                <latinAlphabetNo1/>
                                            </alphabetIndicator>
                                            <licencePlateNumber>3537343233373337333934343538</licencePlateNumber>
                                        </licencePlateNumber>
                                    </userId>
                                    <statusType>3</statusType>
                                    <reasonCode>8</reasonCode>
                                </ExceptionListEntry>
                                <ExceptionListEntry>
                                    <userId>
                                        <licencePlateNumber>
                                            <countryCode>0110000001</countryCode>
                                            <alphabetIndicator>
                                                <latinAlphabetNo1/>
                                            </alphabetIndicator>
                                            <licencePlateNumber>3437353833343330333134373538</licencePlateNumber>
                                        </licencePlateNumber>
                                    </userId>
                                    <statusType>3</statusType>
                                    <reasonCode>8</reasonCode>
                                </ExceptionListEntry>
                                <ExceptionListEntry>
                                    <userId>
                                        <licencePlateNumber>
                                            <countryCode>0110000001</countryCode>
                                            <alphabetIndicator>
                                                <latinAlphabetNo1/>
                                            </alphabetIndicator>
                                            <licencePlateNumber>3434356133363332333835303436</licencePlateNumber>
                                        </licencePlateNumber>
                                    </userId>
                                    <statusType>3</statusType>
                                    <reasonCode>8</reasonCode>
                                </ExceptionListEntry>
                            </exceptionListEntries>
                        </ExceptionListADU>
                    </exceptionListADUs>
                </adus>
            </infoExchangeContent>
        </InfoExchange>
        `
    }

    private static countryCodeAlphabet: Map<string, number> = new Map<string, number>();


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

    private static initAlphabet() {
        this.countryCodeAlphabet.set('A', 24);
        this.countryCodeAlphabet.set('B', 19);
        this.countryCodeAlphabet.set('C', 14);
        this.countryCodeAlphabet.set('D', 18);
        this.countryCodeAlphabet.set('E', 16);
        this.countryCodeAlphabet.set('F', 22);
        this.countryCodeAlphabet.set('G', 11);
        this.countryCodeAlphabet.set('H', 5);
        this.countryCodeAlphabet.set('I', 12);
        this.countryCodeAlphabet.set('J', 26);
        this.countryCodeAlphabet.set('K', 30);
        this.countryCodeAlphabet.set('L', 9);
        this.countryCodeAlphabet.set('M', 7);
        this.countryCodeAlphabet.set('N', 6);
        this.countryCodeAlphabet.set('O', 3);
        this.countryCodeAlphabet.set('P', 13);
        this.countryCodeAlphabet.set('Q', 29);
        this.countryCodeAlphabet.set('R', 10);
        this.countryCodeAlphabet.set('S', 20);
        this.countryCodeAlphabet.set('T', 1);
        this.countryCodeAlphabet.set('U', 28);
        this.countryCodeAlphabet.set('V', 15);
        this.countryCodeAlphabet.set('W', 25);
        this.countryCodeAlphabet.set('X', 23);
        this.countryCodeAlphabet.set('Y', 21);
        this.countryCodeAlphabet.set('Z', 17);
    }
}