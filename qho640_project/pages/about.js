
function AboutPage() {
    return (
      <section className="section is-medium">
        <div className="container">
          <h1 className="title has-text-centered">About Connect Shop</h1>
          <div className="block"></div>
          <h2 className="subtitle">Our Mission</h2>
          <p>
            Connect Shop is a fictional mobile phone shop designed as part of the QHO640 - Contemporary Web Applications module. Our goal is to demonstrate a fully functional web application built using Next.js integrated with Firebase.
          </p>
          <div className="block"></div>
          <h2 className="subtitle">Features for Users</h2>
          <p>
            At Connect Shop, users can enjoy a seamless shopping experience with the ability to:
            <ul>
              <li>View a wide range of mobile phone products.</li>
              <li>Add products to a shopping cart and proceed to checkout.</li>
              <li>View past orders and manage account details.</li>
            </ul>
          </p>
          <div className="block"></div>
          <h2 className="subtitle">Administrator Features</h2>
          <p>
            For administrators, Connect Shop provides extensive control over the platform, enabling them to:
            <ul>
              <li>Add, edit, and delete product listings.</li>
              <li>Manage user roles and access.</li>
              <li>View and process all orders to ensure timely fulfillment.</li>
            </ul>
          </p>
        </div>

    </section>
    );
  }
  
  export default AboutPage;
  