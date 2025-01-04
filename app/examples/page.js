import React from "react";

const ExamplesPage = () => {
  return (
    <section className="h-screen overflow-hidden">
      {/* <!-- Static (non-scrollable) section --> */}
      <div className="h-[90vh] bg-red-600 w-full"></div>

      {/* <!-- Scrollable section 1 --> */}
      <div className="h-[10vh] bg-green-600 overflow-y-scroll">
        <p>This section can scroll.</p>
      </div>

      {/* <!-- Scrollable section 2 --> */}
      <div className="h-[30vh] overflow-y-scroll bg-gray-200 p-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet aliquet finibus.
          Praesent laoreet aliquam massa viverra consectetur. Vivamus pellentesque placerat ligula,
          varius bibendum lectus volutpat in. Maecenas sit amet placerat sapien. Aliquam at ultrices
          sapien, sit amet sagittis tortor. Sed rutrum tellus ut justo laoreet ultricies. Quisque
          vitae pulvinar mauris, in commodo tortor. Aliquam euismod sodales urna sit amet sagittis.
          Nunc lectus tellus, faucibus bibendum nisi nec, aliquet finibus justo. Ut consequat leo ut
          maximus tincidunt. Donec ipsum arcu, congue ac augue non, laoreet dignissim felis.
        </p>
      </div>
    </section>
  );
};

export default ExamplesPage;
