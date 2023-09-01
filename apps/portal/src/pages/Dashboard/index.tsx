import {
  Page,
  LegacyCard,
  Text,
  HorizontalGrid,
  VerticalStack,
  Box,
  Icon,
} from '@shopify/polaris'
import {
  ArrowUpMinor,
} from '@shopify/polaris-icons'

export const Dashboard = () => (
  <Page title="Example app">
    <HorizontalGrid
      gap="5"
      columns={2}
      alignItems="center"
    >
      <Box>
        <LegacyCard sectioned>
          <VerticalStack gap="2">
            <Text
              variant="headingMd"
              as="h4"
            >
              Products
            </Text>
            <HorizontalGrid columns={3}>
              <Box>
                <Text
                  as="p"
                  variant="headingXl"
                  fontWeight="medium"
                >
                  89,394
                </Text>
                <HorizontalGrid>
                  <Icon
                    source={ArrowUpMinor}
                    color="success"
                  />
                  20%
                </HorizontalGrid>
              </Box>
              <Box>
                1
              </Box>
            </HorizontalGrid>
          </VerticalStack>
        </LegacyCard>
      </Box>
    </HorizontalGrid>
  </Page>
)
