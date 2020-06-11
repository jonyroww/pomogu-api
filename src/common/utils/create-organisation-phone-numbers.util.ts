export async function createPhoneNumbers(
  phone_numbers: Array<string>,
  organisation,
  organisationPhoneNumberRepository,
) {
  const newPhoneNumbersList = phone_numbers.map(phone_number => {
    return {
      phone_number: phone_number,
      organisation_id: organisation.id,
    };
  });

  const newPhoneNumbers = organisationPhoneNumberRepository.create(
    newPhoneNumbersList,
  );
  await organisationPhoneNumberRepository.save(newPhoneNumbers);
}
