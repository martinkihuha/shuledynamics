import app from '@adonisjs/core/services/app'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    if (
      !Seeder.default.environment ||
      (!Seeder.default.environment.includes('development') && app.inDev) ||
      (!Seeder.default.environment.includes('testing') && app.inTest) ||
      (!Seeder.default.environment.includes('production') && app.inProduction)
    ) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.seed(await import('#database/seeders/country_seeder'))
    await this.seed(await import('#database/seeders/county_seeder'))
    await this.seed(await import('#database/seeders/currency_seeder'))
    await this.seed(await import('#database/seeders/gender_seeder'))
    await this.seed(await import('#database/seeders/religion_seeder'))
    await this.seed(await import('#database/seeders/tax_seeder'))
    await this.seed(await import('#database/seeders/module_seeder'))
    await this.seed(await import('#database/seeders/curriculum_seeder'))
    await this.seed(await import('#database/seeders/grade_seeder'))
    await this.seed(await import('#database/seeders/student_status_seeder'))
    await this.seed(await import('#database/seeders/student_tab_seeder'))
  }
}
