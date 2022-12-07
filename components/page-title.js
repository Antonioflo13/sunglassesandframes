import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import { motion } from "framer-motion";

const PageTitle = ({
  title,
  titleValues,
  subtitle,
  subtitleValues,
  breadcrumbs,
  accessory,
}) => (
  <div>
    {breadcrumbs && Array.isArray(breadcrumbs) && (
      <div className="mb-4 flex items-center">
        <div className="flex flex-wrap items-center mt-1 text-sunglassesandframes-breadcrumbs-grey">
          {breadcrumbs.map((b, i) => (
            <div key={`${i}`} className="flex items-center">
              {i !== 0 && <div className="ml-1">&gt;</div>}
              <div
                className={`ml-1 text-sm ${
                  i + 1 === breadcrumbs.length ? "font-bold" : ""
                }`}
              >
                {b.link ? (
                  <Link href={b.link}>
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <FormattedMessage id={b.title} />
                    </motion.div>
                  </Link>
                ) : (
                  <FormattedMessage id={b.title} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    <div className="text-xl md:text-3xl font-semibold leading-tight monument whitespace-pre-line">
      {React.isValidElement(title) ? (
        title
      ) : (
        <FormattedMessage
          id={title}
          values={{
            ...titleValues,
            b: chunk => <Bold>{chunk}</Bold>,
          }}
        />
      )}
    </div>
    {accessory && <div className="my-4">{accessory}</div>}
    {subtitle && (
      <div className="mt-4">
        {React.isValidElement(subtitle) ? (
          subtitle
        ) : (
          <div className="text-xs whitespace-pre-line">
            <FormattedMessage
              id={subtitle}
              values={{
                ...subtitleValues,
                b: chunk => <span className="font-bold">{chunk}</span>,
              }}
            />
          </div>
        )}
      </div>
    )}
  </div>
);

export default PageTitle;

export const Bold = ({ children }) => (
  <span className="text-2xl md:text-4xl font-black italic mackay text-sunglassesandframes-red">
    {children}
  </span>
);
