import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import { AppInfo } from '@/constants/app-info';

export type PasswordResetEmailData = {
  recipient: string;

  name: string;
  resetPasswordLink: string;
};

export const PasswordResetEmail = ({
  name,
  resetPasswordLink
}: PasswordResetEmailData) => (
  <Html>
    <Head />
    <Preview>{AppInfo.APP_NAME} restablece tu contraseña</Preview>
    <Tailwind>
      <Body className="m-auto bg-white px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
            Instrucciones para restablecer tu contraseña
          </Heading>
          <Text className="text-[14px] leading-[24px] text-black">
            Hello {name},
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            Alguien recientemente solicitó un cambio de contraseña para tu
            cuenta en {AppInfo.APP_NAME}. Si esto fue tuyo, puedes establecer
            una nueva contraseña aquí:
          </Text>
          <Section className="my-[32px] text-center">
            <Button
              className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
              href={resetPasswordLink}
            >
              Restablecer contraseña
            </Button>
          </Section>
          <Text className="text-[14px] leading-[24px] text-black">
            o copia y pega esta URL en tu navegador:{' '}
            <Link
              href={resetPasswordLink}
              className="text-blue-600 no-underline"
            >
              {resetPasswordLink}
            </Link>
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="text-[12px] leading-[24px] text-[#666666]">
            Si no quieres cambiar tu contraseño o no solicitaste este cambio,
            simplemente ignora y elimina este mensaje. Para mantener tu cuenta
            segura, por favor no reenvíes este correo electrónico a nadie.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
