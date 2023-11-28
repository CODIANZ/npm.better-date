export class HHMM {
  private hhmm = "";
  constructor(hhmm: string | number | HHMM) {
    switch (typeof hhmm) {
      case "string": {
        this.hhmm = hhmm.replace(":", "");
        break;
      }
      case "number": {
        this.hhmm = ("0000" + hhmm.toString()).slice(-4);
        break;
      }
      case "object": {
        if ("hhmm" in hhmm) {
          this.hhmm = hhmm.hhmm;
        }
        break;
      }
    }
  }

  public static from(hhmm: string | number | HHMM) {
    return new HHMM(hhmm);
  }

  private addWithModN(a: number, b: number, N: number) {
    const ab = a + b;
    if (ab < 0) {
      const _ab = -ab;
      return {
        carry: -(1 + Math.floor(_ab / N)),
        n: (N - (_ab % N)) % N,
      };
    } else {
      return {
        n: ab % N,
        carry: Math.floor(ab / N),
      };
    }
  }

  public get valid() {
    /* 0000 ～ 2959 */
    return this.hhmm.match(/^[0-2][0-9][0-5][0-9]$/) !== null;
  }

  public get empty() {
    return this.hhmm.length === 0;
  }

  public get h() {
    return parseInt(this.hstr);
  }

  public get m() {
    return parseInt(this.mstr);
  }

  public get hstr() {
    return this.hhmm.substring(0, 2);
  }

  public get mstr() {
    return this.hhmm.substring(2);
  }

  public get mtotal() {
    return this.h * 60 + this.m;
  }

  public get str() {
    return this.hhmm;
  }

  public get strWithColon() {
    return this.hstr + ":" + this.mstr;
  }

  public mzero() {
    return this.addMinutes(-this.m);
  }

  public addMinutes(dt: number) {
    const maxM = 96 - 1;
    const r = this.addWithModN(this.m, dt, 60);
    if (this.h + r.carry < 0) {
      return HHMM.from(maxM.toString() + ("00" + r.n).slice(-2));
    } else if (this.h + r.carry > maxM) {
      return HHMM.from("00" + ("00" + r.n).slice(-2));
    } else {
      return HHMM.from(
        ("00" + (this.h + r.carry)).slice(-2) + ("00" + r.n).slice(-2)
      );
    }
  }

  public floor(alignMinutes: number) {
    const offset = alignMinutes * Math.floor(this.m / alignMinutes);
    return this.addMinutes(-this.m + offset);
  }

  public ceil(alignMinutes: number) {
    const offset = alignMinutes * Math.ceil(this.m / alignMinutes);
    return this.addMinutes(-this.m + offset);
  }
}
