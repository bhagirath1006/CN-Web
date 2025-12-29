import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PixelTransition from '../components/PixelTransition'
import './BlogPage.css'

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const totalPages = 2

  const blogPosts = [
    { id: 1, date: '08 JUN', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop' },
    { id: 2, date: '09 DEC', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop' },
    { id: 3, date: '07 AUG', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop' },
    { id: 4, date: '10 APR', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop' },
    { id: 5, date: '09 FEB', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop' },
    { id: 6, date: '03 AUG', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop' },
    { id: 7, date: '15 MAR', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop' },
    { id: 8, date: '22 JAN', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop' },
    { id: 9, date: '05 NOV', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop' },
    { id: 10, date: '18 SEP', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop' },
    { id: 11, date: '12 MAY', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop' },
    { id: 12, date: '28 JUL', title: 'Improving Business Growth with New Technology', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop' }
  ]

  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = blogPosts.slice(startIndex, endIndex)

  return (
    <>
      <Header />
      
      <section className="blog-hero">
        <div className="blog-hero-container">
          <h1 className="blog-hero-title">Blogs</h1>
          {/* <div className="blog-breadcrumb">
            <Link to="/">HOME</Link>
            <span> / </span>
            <span>BLOG</span>
          </div> */}
        </div>
      </section>

      <section className="blog-content">
        <div className="blog-content-container">
          <div className="blog-grid">
            {currentPosts.map((post) => (
              <article key={post.id} className="blog-card-wrapper">
                <PixelTransition
                  firstContent={
                    <div 
                      className="blog-card-background"
                      style={{ backgroundImage: `url(${post.image})` }}
                    >
                      <div className="blog-card-overlay"></div>
                      <div className="blog-card-title-default">
                        <h3>{post.title}</h3>
                      </div>
                    </div>
                  }
                  secondContent={
                    <div className="blog-card-content">
                      <div className="blog-card-date">
                        {post.date}
                      </div>
                      <div className="blog-card-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                      </div>
                      <Link to={`/blog/${post.id}`} className="blog-card-link">
                        Read More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  }
                  gridSize={12}
                  pixelColor="#FFFFFF"
                  animationDuration={0.4}
                  once={false}
                  className="blog-pixel-transition"
                />
              </article>
            ))}
          </div>

          <div className="blog-pagination">
            <button
              className="pagination-btn pagination-prev"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="pagination-btn pagination-next"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default BlogPage

