import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Country } from '../entities/Country';

@Resolver(Country)
export class CountryResolver {
  @Mutation(() => Country)
  async addCountry(
    @Arg('code') code: string,
    @Arg('name') name: string,
    @Arg('emoji') emoji: string,
    @Arg('continent') continent: string
  ): Promise<Country> {
    try {
      const newCountry = Country.create({ code, name, emoji, continent });

      await newCountry.save();
      console.log(newCountry);

      return newCountry;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add country');
    }
  }

  // Récupérer tous les pays
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return await Country.find();
  }

  // récupérer un pays par son code
  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg('code') code: string): Promise<Country | null> {
    return await Country.findOneBy({ code });
  }

  // Récupérer les pays d’un continent
  @Query(() => [Country])
  async getCountriesByContinent(@Arg('continent') continent: string): Promise<Country[]> {
    return await Country.findBy({ continent });
  }
}
