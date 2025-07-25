// Global JavaScript for Color Cart Buddy
document.addEventListener('DOMContentLoaded', function() {
    console.log('Color Cart Buddy - Sistema de Pedidos carregado');
    
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add smooth scrolling for any anchor links
    addSmoothScrolling();
    
    // Add loading states to buttons
    addButtonLoadingStates();
    
    // Add keyboard navigation support
    addKeyboardNavigation();
    
    // Initialize error handling
    setupErrorHandling();
}

function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addButtonLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state for navigation buttons
            if (this.onclick && this.onclick.toString().includes('window.location')) {
                this.style.opacity = '0.7';
                this.style.cursor = 'wait';
                
                // Reset after a short delay
                setTimeout(() => {
                    this.style.opacity = '';
                    this.style.cursor = '';
                }, 1000);
            }
        });
    });
}

function addKeyboardNavigation() {
    // Add keyboard support for card navigation
    const cards = document.querySelectorAll('.feature-card, .feature-item');
    cards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = this.querySelector('.btn');
                if (button) {
                    button.click();
                }
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextCard = cards[index + 1];
                if (nextCard) {
                    nextCard.focus();
                }
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevCard = cards[index - 1];
                if (prevCard) {
                    prevCard.focus();
                }
            }
        });
    });
}

function setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Erro na aplicação:', e.error);
        showErrorMessage('Ocorreu um erro inesperado. Tente novamente.');
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Promise rejeitada:', e.reason);
        showErrorMessage('Erro de conexão. Verifique sua internet.');
    });
}

function showErrorMessage(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f56565;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, 5000);
}

function showSuccessMessage(message) {
    // Create success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

// Utility functions
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Este campo é obrigatório');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #f56565;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.style.borderColor = '#f56565';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// Local Storage utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erro ao ler do localStorage:', error);
        return null;
    }
}

// Animation utilities
function addFadeInAnimation(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Product management functions
function getProducts() {
    try {
        const products = localStorage.getItem('products');
        return products ? JSON.parse(products) : [];
    } catch (error) {
        console.error('Erro ao ler produtos do localStorage:', error);
        return [];
    }
}

function saveProducts(products) {
    try {
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    } catch (error) {
        console.error('Erro ao salvar produtos:', error);
        return false;
    }
}

function addProduct(product) {
    const products = getProducts();
    products.push(product);
    return saveProducts(products);
}

function updateProduct(updatedProduct) {
    let products = getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = updatedProduct;
        return saveProducts(products);
    }
    return false;
}

function deleteProduct(productId) {
    let products = getProducts();
    products = products.filter(p => p.id !== productId);
    return saveProducts(products);
}

// Export functions for use in other pages
window.ColorCartBuddy = {
    showErrorMessage,
    showSuccessMessage,
    validateForm,
    saveToLocalStorage,
    getFromLocalStorage,
    addFadeInAnimation,
    getProducts,
    saveProducts,
    addProduct,
    updateProduct,
    deleteProduct
};
