export class Buffer {
  private message: number[] = [];
  private header: number;
  private index: number = 0;

  constructor(header: number) {
    this.header = header;
    this.writeShort(header);
  }

  writeByte(value: number): void {
    this.message.push(value);
    this.index += 1;
  }

  writeBool(value: boolean): void {
    this.writeByte(value ? 1 : 0);
  }

  writeShort(value: number): void {
    const bytes: number[] = [(value >> 8) & 0xff, value & 0xff];
    this.message.push(...bytes);
    this.index += 2;
  }

  private anyToInt32(value: any): number {
    switch (typeof value) {
      case 'number':
        return Math.round(value);
      case 'string':
        const resultVal = parseInt(value, 10);
        if (!isNaN(resultVal)) {
          return resultVal;
        }
        console.log('Error converting string to int:', value);
        return 0;
      default:
        console.log('Error: Unknown type conversion attempted:', value);
        return 0;
    }
  }

  writeInt(value: any): void {
    const newValue = this.anyToInt32(value);
    const bytes: number[] = [
      (newValue >> 24) & 0xff,
      (newValue >> 16) & 0xff,
      (newValue >> 8) & 0xff,
      newValue & 0xff,
    ];
    this.message.push(...bytes);
    this.index += 4;
  }

  writeString(data: string): void {
    const dataLength = data.length;
    this.writeShort(dataLength);
    this.message.push(...data.split('').map(char => char.charCodeAt(0)));
    this.index += dataLength;
  }

  getData(): number[] {
    const indexBytes: number[] = [
      (this.index >> 24) & 0xff,
      (this.index >> 16) & 0xff,
      (this.index >> 8) & 0xff,
      this.index & 0xff,
    ];
    return [...indexBytes, ...this.message];
  }
}
