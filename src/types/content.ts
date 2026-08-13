/**
 * Content shapes mirroring tina/config.ts.
 *
 * Tina generates every field as nullable, so these are all optional —
 * components must render sensibly with missing values.
 */

type Maybe<T> = T | null | undefined;

export type LinkItem = {
  label?: Maybe<string>;
  href?: Maybe<string>;
};

export type HeaderContent = {
  logo?: Maybe<string>;
  logoAlt?: Maybe<string>;
  navLinks?: Maybe<Maybe<LinkItem>[]>;
  loginLabel?: Maybe<string>;
  ctaLabel?: Maybe<string>;
  ctaLabelMobile?: Maybe<string>;
  ctaHref?: Maybe<string>;
  phoneIcon?: Maybe<string>;
  menuIcon?: Maybe<string>;
};

export type FooterContent = {
  logo?: Maybe<string>;
  tagline?: Maybe<string>;
  links?: Maybe<Maybe<LinkItem>[]>;
  copyright?: Maybe<string>;
  social?: Maybe<
    Maybe<{
      name?: Maybe<string>;
      href?: Maybe<string>;
      icon?: Maybe<string>;
    }>[]
  >;
};

export type HeroContent = {
  title?: Maybe<string>;
  subtitle?: Maybe<string>;
  titleMobile?: Maybe<string>;
  subtitleMobile?: Maybe<string>;
  background?: Maybe<string>;
  backgroundMobile?: Maybe<string>;
};

export type QuotingContent = {
  titleMobile?: Maybe<string>;
  destinationLabel?: Maybe<string>;
  destinationPlaceholder?: Maybe<string>;
  datesLabel?: Maybe<string>;
  datesPlaceholder?: Maybe<string>;
  passengersLabel?: Maybe<string>;
  passengersPlaceholder?: Maybe<string>;
  ctaLabel?: Maybe<string>;
  ctaLabelMobile?: Maybe<string>;
  couponPlaceholder?: Maybe<string>;
  priceLabel?: Maybe<string>;
  priceAmount?: Maybe<string>;
  priceUnit?: Maybe<string>;
  originLabel?: Maybe<string>;
  originPlaceholder?: Maybe<string>;
  destinationLabelMobile?: Maybe<string>;
  destinationPlaceholderMobile?: Maybe<string>;
  departureLabel?: Maybe<string>;
  returnLabel?: Maybe<string>;
};

export type PartnersContent = {
  heading?: Maybe<string>;
  logos?: Maybe<
    Maybe<{
      src?: Maybe<string>;
      alt?: Maybe<string>;
      width?: Maybe<number>;
      height?: Maybe<number>;
    }>[]
  >;
};

export type FeatureItem = {
  title?: Maybe<string>;
  body?: Maybe<string>;
  icon?: Maybe<string>;
  image?: Maybe<string>;
  ctaLabel?: Maybe<string>;
  ctaHref?: Maybe<string>;
};

export type FeaturesContent = {
  heading?: Maybe<string>;
  headingMobile?: Maybe<string>;
  subheading?: Maybe<string>;
  items?: Maybe<Maybe<FeatureItem>[]>;
  itemsMobile?: Maybe<Maybe<FeatureItem>[]>;
};

export type FaqItem = {
  question?: Maybe<string>;
  answer?: Maybe<string>;
  defaultOpen?: Maybe<boolean>;
  mobileOnly?: Maybe<boolean>;
};

export type FaqContent = {
  heading?: Maybe<string>;
  subheading?: Maybe<string>;
  subheadingMobile?: Maybe<string>;
  items?: Maybe<Maybe<FaqItem>[]>;
};

export type GlobalContent = {
  header?: Maybe<HeaderContent>;
  footer?: Maybe<FooterContent>;
};

export type HomeContent = {
  hero?: Maybe<HeroContent>;
  quoting?: Maybe<QuotingContent>;
  partners?: Maybe<PartnersContent>;
  features?: Maybe<FeaturesContent>;
  faq?: Maybe<FaqContent>;
};
