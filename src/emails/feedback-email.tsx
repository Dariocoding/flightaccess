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

export type FeedbackEmailData = {
  recipient: string;

  organizationName: string;
  name: string;
  email: string;
  category: string;
  message: string;
};

export const FeedbackEmail = ({
  organizationName,
  name,
  email,
  category,
  message
}: FeedbackEmailData) => (
  <Html>
    <Head />
    <Preview>Feedback de {organizationName}</Preview>
    <Tailwind>
      <Body className="m-auto bg-white px-2 font-sans">
        <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
            Feedback
          </Heading>
          <Text className="text-[14px] leading-[24px] text-black">
            Organización: {organizationName}
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            Nombre: {name}
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            Correo electrónico: {email}
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            Categoría: {category}
          </Text>
          <Text className="text-[14px] leading-[24px] text-black">
            Mensaje: {message}
          </Text>
          <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          <Text className="text-[12px] leading-[24px] text-[#666666]">
            Recibes este correo electrónico porque alguien envió un feedback en
            {AppInfo.APP_NAME}.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
