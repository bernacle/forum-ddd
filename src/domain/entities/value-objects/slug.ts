export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and normalize it and converts into a slug
   * 
   * Example: "A simple example" => "a-simple-example"
   * 
   * @param text {string}
   */

  static createFromText(text: string){
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}