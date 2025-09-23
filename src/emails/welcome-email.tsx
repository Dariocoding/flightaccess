import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import { AppInfo } from '@/constants/app-info';
import { Routes } from '@/constants/routes';
import { getBaseUrl } from '@/lib/urls/get-base-url';

export type WelcomeEmailData = {
  recipient: string;
  name: string;
};

export const WelcomeEmail = ({ name }: WelcomeEmailData) => (
  <Html>
    <Head />
    <Preview>Bienvenido a {AppInfo.APP_NAME}!</Preview>
    <Tailwind>
      <Body className="m-auto bg-white px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
            Bienvenido a {AppInfo.APP_NAME}!
          </Heading>
          <Text className="text-[14px] leading-[24px] text-black">
            Hello {name},
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            Gracias por registrarte! Estamos emocionados de tenerte en la
            plataforma. Tu cuenta ha sido creada con éxito, y estás listo para
            empezar a explorar nuestra plataforma.
          </Text>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
              href={`${getBaseUrl()}${Routes.Dashboard}`}
            >
              Comenzar
            </Button>
          </Section>
          <Text className="text-[14px] leading-[24px] text-black">
            Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar a
            nuestro equipo de soporte.
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="text-[12px] leading-[24px] text-[#666666]">
            Recibes este correo electrónico porque te registraste en{' '}
            {AppInfo.APP_NAME}.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
