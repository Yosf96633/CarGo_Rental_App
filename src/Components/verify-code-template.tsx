import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr" className="bg-gray-100 p-4">
        <Head>
          <title>Verification Code</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Here&apos;s your verification code: {otp}</Preview>
        <Section className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <Row className="mb-4">
            <Heading as="h2" className="text-2xl font-bold text-gray-800">
              Hello {username},
            </Heading>
          </Row>
          <Row className="mb-4">
            <Text className="text-gray-600 text-base">
              Thank you for registering. Please use the following verification code to complete your registration:
            </Text>
          </Row>
          <Row className="mb-4">
            <Text className="bg-blue-500 text-white font-semibold py-2 px-4 rounded text-lg inline-block">
              {otp}
            </Text>
          </Row>
          <Row>
            <Text className="text-gray-500 text-sm">
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }
  