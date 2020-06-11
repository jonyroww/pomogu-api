import { OrganisationWebsiteRepository } from '../../organisations/repositories/OrganisationWebsite.repository';

export async function createWebsites(
  websites: Array<string>,
  organisation,
  organisationWebsiteRepository,
) {
  const newWebsitesList = websites.map(website => {
    return {
      url: website,
      organisation_id: organisation.id,
    };
  });
  const newWebsites = organisationWebsiteRepository.create(newWebsitesList);
  await organisationWebsiteRepository.save(newWebsites);
}
