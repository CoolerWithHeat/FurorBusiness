<script>
import bootstrapCss from '../css/custom-bootstrap.css?inline'
import themifyCss from '../css/themify-icons.css?inline'
import owlCss from '../css/owl.carousel.min.css?inline'
import mainCss from '../css/main.css?inline'

export default {
  data() {
    return { 
      stylesReady: false,
      styleElement: null
    }
  },
  beforeMount() {
    this.styleElement = document.createElement('style')
    this.styleElement.id = 'landing-page-styles'
    this.styleElement.textContent = [bootstrapCss, themifyCss, owlCss, mainCss].join('\n')
    document.head.appendChild(this.styleElement)
    this.stylesReady = true
  },
  beforeUnmount() {
    if (this.styleElement) {
      this.styleElement.remove()
      this.styleElement = null
    }
  }
}
</script>

<template>
  <body v-if="stylesReady" data-spy="scroll" data-target="#navbar" data-offset="30">
    <div class="nav-menu fixed-top">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-dark navbar-expand-lg">
              <a class="navbar-brand" href="../#/demo">
                <span>Furor</span>
              </a>
              <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <a class="nav-link active" href="../#/demo"
                      >HOME <span class="sr-only">(current)</span></a
                    >
                  </li>
                  <li class="nav-item"><a class="nav-link" href="../#/demo">FEATURES</a></li>
                  <li class="nav-item"><a class="nav-link" href="../#/demo">GALLERY</a></li>
                  <li class="nav-item"><a class="nav-link" href="../#/demo">PRICING</a></li>
                  <li class="nav-item"><a class="nav-link" href="../#/demo">CONTACT</a></li>
                  <li class="nav-item">
                    <a href="../#/demo" class="btn btn-outline-light my-3 my-sm-0 ml-lg-3"
                      >Download</a
                    >
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <header class="bg-gradient" id="home">
      <div class="container mt-5">
        <h1>Furor Business Landing Page</h1>
        <p class="tagline">
          The one and only solution for any kind of mobila app landing needs. Just change the
          screenshots and texts and you are good to go.
        </p>
      </div>
      <div class="img-holder mt-3">
        <img src="images/iphonex.png" alt="phone" class="img-fluid" />
      </div>
    </header>

    <div class="client-logos my-5">
      <div class="container text-center">
        <img src="images/client-logos.png" alt="client logos" class="img-fluid" />
      </div>
    </div>

    <div class="section light-bg">
      <div class="container">
        <div class="row">
          <div class="col-md-8 d-flex align-items-center">
            <ul class="list-unstyled ui-steps">
              <li class="media">
                <div class="circle-icon mr-4">1</div>
                <div class="media-body">
                  <h5>Create an Account</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu
                    pellentesque pretium obcaecati vel exercitationem
                  </p>
                </div>
              </li>
              <li class="media my-4">
                <div class="circle-icon mr-4">2</div>
                <div class="media-body">
                  <h5>Share with friends</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu
                    pellentesque pretium obcaecati vel exercitationem eveniet
                  </p>
                </div>
              </li>
              <li class="media">
                <div class="circle-icon mr-4">3</div>
                <div class="media-body">
                  <h5>Enjoy your life</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu
                    pellentesque pretium obcaecati vel exercitationem
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <img src="images/iphonex.png" alt="iphone" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img src="images/dualphone.png" alt="dual phone" class="img-fluid" />
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <div>
              <div class="box-icon">
                <img width="100%" src="images/mobile-dev.png" alt="iphone" />
              </div>
              <h2>Launch your App</h2>
              <p class="mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati vel
                exercitationem eveniet vero maxime ratione
              </p>
              <a href="../#/demo" class="btn btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section" id="pricing">
      <div class="container">
        <div class="section-title">
          <small>PRICING</small>
          <h3>Upgrade to Pro</h3>
        </div>

        <div class="card-deck">
          <div class="card pricing">
            <div class="card-head">
              <small class="text-primary">PERSONAL</small>
              <span class="price">$14<sub>/m</sub></span>
            </div>
            <ul class="list-group list-group-flush">
              <div class="list-group-item">10 Projects</div>
              <div class="list-group-item">5 GB Storage</div>
              <div class="list-group-item">Basic Support</div>
              <div class="list-group-item"><del>Collaboration</del></div>
              <div class="list-group-item"><del>Reports and analytics</del></div>
            </ul>
            <div class="card-body">
              <a href="../#/demo" class="btn btn-primary btn-lg btn-block">Choose this Plan</a>
            </div>
          </div>
          <div class="card pricing popular">
            <div class="card-head">
              <small class="text-primary">FOR TEAMS</small>
              <span class="price">$29<sub>/m</sub></span>
            </div>
            <ul class="list-group list-group-flush">
              <div class="list-group-item">Unlimited Projects</div>
              <div class="list-group-item">100 GB Storage</div>
              <div class="list-group-item">Priority Support</div>
              <div class="list-group-item">Collaboration</div>
              <div class="list-group-item">Reports and analytics</div>
            </ul>
            <div class="card-body">
              <a href="../#/demo" class="btn btn-primary btn-lg btn-block">Choose this Plan</a>
            </div>
          </div>
          <div class="card pricing">
            <div class="card-head">
              <small class="text-primary">ENTERPRISE</small>
              <span class="price">$249<sub>/m</sub></span>
            </div>
            <ul class="list-group list-group-flush">
              <div class="list-group-item">Unlimited Projects</div>
              <div class="list-group-item">Unlimited Storage</div>
              <div class="list-group-item">Collaboration</div>
              <div class="list-group-item">Reports and analytics</div>
              <div class="list-group-item">Web hooks</div>
            </ul>
            <div class="card-body">
              <a href="../#/demo" class="btn btn-primary btn-lg btn-block">Choose this Plan</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section bg-gradient">
      <div class="container">
        <div class="call-to-action">
          <div class="box-icon">
            <img width="100%" src="images/mobile-dev.png" alt="iphone" />
          </div>
          <h2>Download Anywhere</h2>
          <p class="tagline">
            Available for all major mobile and desktop platforms. Rapidiously visualize optimal ROI
            rather than enterprise-wide methods of empowerment.
          </p>
          <div class="my-4">
            <a href="../#/demo" class="btn btn-light"
              ><img src="images/appleicon.png" alt="icon" /> App Store</a
            >
            <a href="../#/demo" class="btn btn-light"
                ><img src="images/playicon.png" alt="icon" /> Google play</a
            >
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped></style>
