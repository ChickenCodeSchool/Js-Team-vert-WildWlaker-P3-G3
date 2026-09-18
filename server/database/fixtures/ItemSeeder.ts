import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

class ItemSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "item", truncate: true, dependencies: [UserSeeder] });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeItem = {
        title: this.faker.lorem.word(),
        user_id: this.getRef(`user_${i}`).insertId,
      };

      this.insert(fakeItem);
    }
  }
}

export default ItemSeeder;
