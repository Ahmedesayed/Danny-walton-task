import { COUNTRIES } from '@app/constants/countries';
import { environment } from '@env/environment';

export interface ICountry {
  name: string;
  dial_code: string;
  code: string;
  flagUrl: string;
  id: number;
}

export interface IPhoneNumber {
  dial_code: string;
  phone: string;
}

export class PhoneHandler {
  public static countryCode = environment.countrySettings.countryCode;

  public static getCountries(): ICountry[] {
    return COUNTRIES.sort((a: ICountry, b: ICountry) => {
      return a.dial_code > b.dial_code ? 1 : -1;
    });
  }

  public static getPhoneArray(phone: string) {
    let phoneObj = PhoneHandler.getPhoneObject(phone);
    if (phoneObj) {
      return [phoneObj.dial_code, phoneObj.phone];
    } else {
      return [this.countryCode, ''];
    }
  }

  public static getPhoneObject(phone: string): IPhoneNumber | null {
    // if the phone is null return.
    if (!phone) return null;
    const codes = PhoneHandler.getCodesTable();
    return PhoneHandler.getFormattedPhone(phone, codes);
  }

  // public static isValidNumber(phone: string, regionCode?: string): boolean {
  //   try {
  //     const phoneNumberUtil = PhoneNumberUtil.getInstance();
  //     const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
  //       phone,
  //       regionCode
  //     );
  //     return phoneNumberUtil.isValidNumber(phoneNumber);
  //   } catch (ex) {
  //     return false;
  //   }
  // }

  private static getFormattedPhone(
    phone: string,
    codesTable: { [key: string]: ICountry }
  ): IPhoneNumber {
    const p = `${phone[0] === '+' ? '' : '+'}${phone}`;
    let i = 1;
    const max = 5;
    while (i <= max) {
      if (codesTable[p.substr(0, i)]) {
        const code = p.substr(0, i);
        return { dial_code: code, phone: p.substr(code.length) };
      }
      i++;
    }

    // default code is the country from env if no code found
    // check if the phone number starts with 0, that means the user entered the
    // local phone number without the country code, so we automatically add the country code to it
    // remove the 0 if the number start with 0
    const num = phone.startsWith('0') ? phone.substr(1) : phone;
    return { dial_code: this.countryCode, phone: num };
  }

  private static getCodesTable(): { [key: string]: ICountry } {
    const codes: any = {};
    PhoneHandler.getCountries().forEach((country: ICountry) => {
      codes[country.dial_code] = country;
    });
    return codes;
  }

  public static filterCountryCode(code: string) {
    const countryCode = code.toLowerCase();
    return COUNTRIES.filter((option: ICountry) =>
      option.dial_code.toLowerCase().includes(countryCode)
    );
  }

  // public static splitCountryCodeFromPhone(phone: string) {
  //   const phoneUtil = PhoneNumberUtil.getInstance();
  //   try {
  //     const numberProto = phoneUtil.parse(phone, '');
  //     return {
  //       countryCode: '+' + numberProto.getCountryCode(),
  //       nationalNumber: numberProto.getNationalNumber(),
  //     };
  //   } catch (ex: any) {
  //     console.log('NumberParseException was thrown: ' + ex.toString());
  //     return null;
  //   }
  // }
}
