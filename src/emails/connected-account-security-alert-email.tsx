import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import { AppInfo } from '@/constants/app-info';

export type ConnectedAccountSecurityAlertEmailData = {
  recipient: string;

  name: string;
  provider: string;
  action: 'connected' | 'disconnected';
};

export const ConnectedAccountSecurityAlertEmail = ({
  name,
  provider,
  action
}: ConnectedAccountSecurityAlertEmailData) => (
  <Html>
    <Head />
    <Preview>¡Alerta de seguridad!</Preview>
    <Tailwind>
      <Body className="m-auto bg-white px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
            ¡Alerta de seguridad!
          </Heading>
          <Text className="text-[14px] leading-[24px] text-black">
            Hello {name},
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            El inicio de sesión '{provider}' ha sido {action}{' '}
            {action === 'disconnected' ? 'de' : 'a'} tu cuenta.
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="text-[12px] leading-[24px] text-[#666666]">
            Recibes este mensaje porque hay cambios en la seguridad de tu cuenta
            en {AppInfo.APP_NAME}.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
