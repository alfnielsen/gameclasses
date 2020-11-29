export class MathX {
  static readonly PI2 = Math.PI * 2
  static readonly rad1 = 180 / Math.PI
  static readonly deg1 = Math.PI / 180
  static readonly deg5 = 5 * MathX.deg1
  static readonly deg10 = 10 * MathX.deg1
  static readonly deg25 = 25 * MathX.deg1
  static readonly deg45 = 45 * MathX.deg1
  static readonly deg90 = 90 * MathX.deg1
  static readonly deg135 = 135 * MathX.deg1
  static readonly deg180 = 180 * MathX.deg1

  static toRadians = (deg: number): number => deg / MathX.rad1
  static toDegrees = (rad: number): number => rad * MathX.rad1

  static randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min)
}
