export class Character {
  static Knight = new Character('Knight');
  static Wizard = new Character('Wizard');
  static Dragon = new Character('Dragon');
  static None = new Character('none');
  constructor(name) {
    this.name = name;
  }
  toString(){
    return this.name;
  }
  startingHealth(){
    switch (this){
      case Character.Knight:
        return 50;
      case Character.Wizard:
        return 35;
      case Character.Dragon:
        return 99;
    }
  }
  startingMana(){
    switch (this){
      case Character.Knight:
        return 15;
      case Character.Wizard:
        return 50;
      case Character.Dragon:
        return 5;
    }
  }
  getImage(){
    switch (this){
      case Character.Knight:
        return "knight.webp";
      case Character.Wizard:
        return "wizard.png";
      case Character.Dragon:
        return "dragon.jpg";
    }
  }
  getAlt(){
    switch (this){
      case Character.Knight:
        return "Vector art of a knight";
      case Character.Wizard:
        return "Vector art of a wizard";
      case Character.Dragon:
        return "Vector art of a dragon";
    }
  }

}
