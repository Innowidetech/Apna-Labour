import React from "react";
import { FileText } from "lucide-react"; // icon import

const TermsCondition = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="bg-[#023E8A] text-white py-10 px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <FileText className="w-10 h-10 text-white mb-3" /> {/* Icon */}
          <h1 className="text-3xl font-semibold mb-2">Terms & Conditions</h1>
        </div>
        <p className="max-w-2xl mx-auto text-sm text-gray-200 leading-relaxed">
          By accessing or using our services, you automatically agree to comply
          with our Terms and Conditions, Privacy Policy, and other applicable
          policies. Please read them carefully.
        </p>
        <p className="mt-3 text-xs text-gray-300 italic">
          Last updated on 30th May, 2025
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto mt-10 p-6 leading-relaxed text-justify text-gray-900">
        <p className="mb-6">
          Welcome to www.lorem-ipsum.info. This site is provided as a service to
          our visitors and may be used for informational purposes only. Because
          the Terms and Conditions contain legal obligations, please read them
          carefully.
        </p>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            1. YOUR AGREEMENT
          </h2>
          <p>
            By using this Site, you agree to be bound by, and to comply with,
            these Terms and Conditions. If you do not agree to these Terms and
            Conditions, please do not use this site.
          </p>
          <p className="mt-2">
            PLEASE NOTE: We reserve the right, at our sole discretion, to
            change, modify or otherwise alter these Terms and Conditions at any
            time. Unless otherwise indicated, amendments will become effective
            immediately. Please review these Terms and Conditions periodically.
            Your continued use of the Site following the posting of changes
            and/or modifications will constitute your acceptance of the revised
            Terms and Conditions and the reasonableness of these standards for
            notice of changes. For your information, this page was last updated
            as of the date at the top of these terms and conditions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            2. Privacy Policy
          </h2>
          <p>
            Please review our Privacy Policy, which also governs your visit to
            this Site, to understand our practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            3. LINKED SITES
          </h2>
          <p>
            This Site may contain links to other independent third-party Web
            sites ("Linked Sites”). These Linked Sites are provided solely as a
            convenience to our visitors. Such Linked Sites are not under our
            control, and we are not responsible for and do not endorse the
            content of such Linked Sites, including any information or materials
            contained on such Linked Sites. You will need to make your own
            independent judgment regarding your interaction with these Linked
            Sites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            4. FORWARD LOOKING STATEMENTS
          </h2>
          <p>
            All materials reproduced on this site speak as of the original date
            of publication or filing. The fact that a document is available on
            this site does not mean that the information contained in such
            document has not been modified or superseded by events or by a
            subsequent document or filing. We have no duty or policy to update
            any information or statements contained on this site and, therefore,
            such information or statements should not be relied upon as being
            current as of the date you access this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            5. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY
          </h2>
          <p>
            A. THIS SITE MAY CONTAIN INACCURACIES AND TYPOGRAPHICAL ERRORS. WE
            DO NOT WARRANT THE ACCURACY OR COMPLETENESS OF THE MATERIALS OR THE
            RELIABILITY OF ANY ADVICE, OPINION, STATEMENT OR OTHER INFORMATION
            DISPLAYED OR DISTRIBUTED THROUGH THE SITE. YOU EXPRESSLY UNDERSTAND
            AND AGREE THAT: (i) YOUR USE OF THE SITE SHALL BE AT YOUR SOLE RISK;
            (ii) THE SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS;
            (iii) EXCEPT AS EXPRESSLY PROVIDED HEREIN WE DISCLAIM ALL WARRANTIES
            OF ANY KIND; (iv) WE MAKE NO WARRANTY WITH RESPECT TO RESULTS THAT
            MAY BE OBTAINED FROM THIS SITE; (v) ANY MATERIAL DOWNLOADED OR
            OTHERWISE OBTAINED IS DONE AT YOUR OWN RISK; and (vi) YOU WILL BE
            SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF
            DATA.
          </p>
          <p className="mt-2">
            B. UNDER NO CIRCUMSTANCES SHALL WE BE LIABLE FOR ANY DIRECT,
            INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE OR CONSEQUENTIAL DAMAGES
            RESULTING FROM THE USE OR INABILITY TO USE ANY OF OUR SITES, EVEN IF
            ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            6. EXCLUSIONS AND LIMITATIONS
          </h2>
          <p>
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES
            OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR
            CONSEQUENTIAL DAMAGES. ACCORDINGLY, OUR LIABILITY IN SUCH
            JURISDICTION SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY
            LAW.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            7. OUR PROPRIETARY RIGHTS
          </h2>
          <p>
            This Site and all its Contents are intended solely for personal,
            non-commercial use. Except as expressly provided, nothing within the
            Site shall be construed as conferring any license under our or any
            third party's intellectual property rights. You agree not to modify,
            alter, or deface any trademarks, or use any content except for the
            purpose for which it was made available.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">8. INDEMNITY</h2>
          <p>
            By using the Site, you agree to indemnify us and affiliated entities
            and hold them harmless from any and all claims and expenses,
            including attorney's fees, arising from your use of the Site or any
            unauthorized access using your credentials.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            9. COPYRIGHT AND TRADEMARK NOTICE
          </h2>
          <p>
            Except our generated dummy copy, which is free to use for private and
            commercial use, all other text is copyrighted.
            generator.lorem-ipsum.info © 2013, all rights reserved.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            10. INTELLECTUAL PROPERTY INFRINGEMENT CLAIMS
          </h2>
          <p>
            It is our policy to respond expeditiously to claims of intellectual
            property infringement. Notices of claimed infringement should be
            directed to:
          </p>
          <p className="mt-2">
            generator.lorem-ipsum.info <br />
            126 Electricov St. <br />
            Kiev, Kiev 04176 <br />
            Ukraine <br />
            contact@lorem-ipsum.info
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">
            11. PLACE OF PERFORMANCE
          </h2>
          <p>
            This Site is controlled, operated and administered by us from our
            office in Kiev, Ukraine. Access from outside the Ukraine is at your
            own risk and you are responsible for compliance with all local laws.
          </p>
        </section>


        <section>
          <h2 className="font-bold text-lg mb-2 text-[#023E8A]">12. GENERAL</h2>
          <p>
            A. If any provision of these Terms and Conditions is held to be
            invalid or unenforceable, the remaining provisions shall be enforced.
            Headings are for reference only. These Terms constitute the entire
            agreement between us regarding your use of the Site.
          </p>
          <p className="mt-2">
            B. No Joint Venture, No Derogation of Rights. You agree that no
            joint venture, partnership, employment, or agency relationship exists
            between you and us as a result of these Terms. Nothing here limits
            our right to comply with legal requests or laws relating to your use
            of the Site.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsCondition;
