export class xml {

    public static generateXml(): string {
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


    public static encodeCountry(country: string) : string {
        return '';
    } 
}