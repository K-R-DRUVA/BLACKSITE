# BLACKSITE Frontend

Next.js-based frontend application for the BLACKSITE Personal Finance Tracker.

## 📋 Overview

This is the frontend client for BLACKSITE, providing an intuitive and modern user interface for managing personal finances. Built with Next.js, React, and Tailwind CSS, it offers a responsive dark-themed experience with interactive charts and real-time updates.

## 🛠 Technology Stack

- **Framework**: Next.js 14.2.15
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: 
  - Radix UI primitives (@radix-ui/*)
  - Custom components built with Headless UI
- **Icons**: Lucide React, Heroicons, Tabler Icons
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios, Native Fetch API
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Form Validation**: Built-in with React hooks

## 📁 Project Structure

```
Frontend/
│
├── public/                 # Static assets (images, fonts, etc.)
│
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── table.jsx
│   │   ├── modal.js
│   │   └── ...
│   │
│   ├── context/          # React Context providers
│   │   └── userContext.js
│   │
│   └── pages/            # Next.js pages (routes)
│       ├── _app.js       # App wrapper
│       ├── _document.js  # Custom document
│       ├── index.js      # Dashboard (/)
│       ├── login.js      # Login page
│       ├── signup.js     # Signup page
│       ├── onboarding.js # User onboarding
│       ├── transactions.js # Transactions page
│       └── goals.js      # Goals page
│
├── components.json       # Shadcn/ui configuration
├── jsconfig.json        # JavaScript configuration
├── next.config.mjs      # Next.js configuration
├── postcss.config.mjs   # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn package manager
- Backend API running (see [Backend README](../Backend/README.md))

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

### Configuration

The frontend connects to the backend API at `http://localhost:5000`. If your backend runs on a different port or host, update the API URLs in the following files:

- `src/pages/login.js`
- `src/pages/signup.js`
- `src/pages/onboarding.js`
- `src/pages/transactions.js`
- `src/pages/goals.js`
- `src/pages/index.js`

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

## 📄 Pages Overview

### Authentication Pages

#### `/login` - Login Page
- User authentication with email and password
- JWT token storage in localStorage
- Redirects to dashboard on successful login
- Error handling for invalid credentials

**Features:**
- Email and password input fields
- Form validation
- Error message display
- Link to signup page

#### `/signup` - Signup Page
- User registration form
- Password confirmation
- Form validation
- Redirects to onboarding flow

**Features:**
- Name, password, and confirm password fields
- Client-side validation
- Password match verification
- Link to login page

#### `/onboarding` - Onboarding Questionnaire
- Multi-step form for new users
- Collects comprehensive financial information
- Progress tracking
- Three main sections:
  1. User Details (name, email, phone, DOB)
  2. Account Details (account type, balance)
  3. Income (amount, source, description)
  4. Savings Goals (target, deadline)

**Features:**
- Animated transitions between questions
- Progress bar
- Form validation
- Navigation (next/previous/submit)
- Context-based state management

### Main Application Pages

#### `/` - Dashboard (Home)
- Overview of financial status
- Summary cards (income, expenses, balance, goals)
- Recent transactions list
- Spending charts by category
- Monthly spending trends
- Quick navigation to other sections

**Features:**
- Tab navigation (Overview, Reports)
- Interactive bar charts
- Real-time data updates
- Financial reports access

#### `/transactions` - Transactions Page
- Complete transaction history
- Add new transactions
- Filter and search functionality
- Transaction categorization

**Features:**
- Transaction table with sorting
- Add transaction modal
- Category-based filtering
- Search by description
- Date-based organization
- Color-coded amounts (income/expense)

#### `/goals` - Financial Goals Page
- View all financial goals
- Create new goals
- Track progress towards goals
- Goal deadline monitoring

**Features:**
- Add new goal form
- Goal cards with progress bars
- Target amount and deadline display
- Progress percentage calculation
- Visual goal tracking

## 🎨 Components

### Core UI Components

#### `button.jsx`
Reusable button component with variants:
- Default
- Ghost
- Outline

#### `card.jsx`
Card container with sub-components:
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

#### `input.jsx`
Styled input field component with:
- Consistent styling
- Focus states
- Error states
- Dark theme support

#### `table.jsx`
Table components for data display:
- `Table` - Main container
- `TableHeader` - Header section
- `TableBody` - Body section
- `TableRow` - Row component
- `TableHead` - Header cell
- `TableCell` - Data cell

#### `modal.js`
Modal dialog component:
- Overlay backdrop
- Close on outside click
- ESC key support
- Smooth animations

#### Other Components
- `tabs.jsx` - Tabbed navigation
- `progress.jsx` - Progress bars
- `label.jsx` - Form labels
- `select.jsx` - Dropdown select
- `calendar.jsx` - Date picker
- `tooltip.jsx` - Tooltips
- `avatar.jsx` - User avatars
- `dialog.jsx` - Dialog modals

### Layout Components

#### Sidebar Navigation
Present on all main pages (dashboard, transactions, goals):
- Logo and app name
- Navigation buttons
- Active route highlighting
- Logout button

**Navigation Items:**
- 🥧 Dashboard
- 💳 Transactions
- 🎯 Goals
- 🚪 Logout

## 🎨 Styling

### Tailwind CSS Configuration

The application uses a custom Tailwind configuration with:
- Dark theme as default
- Custom color palette (greens, blues, grays)
- Custom animations
- Responsive breakpoints
- Custom scrollbar styling

### Color Scheme

```css
Primary: Green (#10b981, #22c55e)
Background: Gray-900 (#111827)
Cards: Gray-800 (#1f2937)
Borders: Gray-700 (#374151)
Text: Gray-100 (#f3f4f6)
Accent: Blue (#2563eb)
Error: Red (#ef4444)
```

### Component Styling Patterns

1. **Cards**: Dark background with lighter borders
2. **Buttons**: Green primary, ghost secondary
3. **Inputs**: Dark with focus rings
4. **Tables**: Alternating row colors
5. **Modals**: Backdrop blur with centered content

## 🔐 Authentication Flow

### Token Storage
JWT tokens are stored in `localStorage` with the key `authToken`.

### Protected Routes
All main pages (dashboard, transactions, goals) check for authentication token on mount. If missing, users are redirected to login.

### Token Usage
```javascript
const authToken = localStorage.getItem('authToken');
fetch(url, {
  headers: {
    'auth-token': authToken,
    'Content-Type': 'application/json'
  }
});
```

### Logout
Logout clears the token and redirects to login:
```javascript
localStorage.removeItem('authToken');
router.push('/login');
```

## 📊 State Management

### Context API

#### UserContext
Located in `src/context/userContext.js`

Provides user information across components:
```javascript
const { userInfo, setUserInfo } = useContext(UserContext);
```

Used primarily in:
- Signup flow
- Onboarding process
- User profile display

### Local State
Pages use React hooks for local state management:
- `useState` - Component state
- `useEffect` - Side effects and data fetching
- `useRouter` - Navigation

## 🔄 Data Fetching

### Pattern
```javascript
useEffect(() => {
  async function fetchData() {
    try {
      const authToken = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:5000/api/endpoint', {
        headers: { 'auth-token': authToken }
      });
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchData();
}, []);
```

### API Endpoints Used

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/transactions` - Fetch transactions
- `POST /api/transactions/add` - Add transaction
- `GET /api/goals` - Fetch goals
- `POST /api/goals/add` - Add goal
- `GET /api/dashboard` - Fetch dashboard data

## 📈 Charts & Visualizations

### Recharts Integration

The dashboard uses Recharts for data visualization:

```javascript
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={spendingData}>
    <XAxis dataKey="category" />
    <YAxis tickFormatter={(value) => `$${value}`} />
    <Bar dataKey="amount" fill="#2563eb" />
  </BarChart>
</ResponsiveContainer>
```

**Chart Types Used:**
- Bar charts for spending by category
- Line charts for trends (if implemented)
- Progress bars for goals

## 🎭 Animations

### Framer Motion

Used in the onboarding flow for smooth transitions:

```javascript
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.div
    key={questionNumber}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {/* Content */}
  </motion.div>
</AnimatePresence>
```

## 🧪 Development Guidelines

### Code Style

1. **Components**: Use functional components with hooks
2. **Naming**: Use descriptive names (camelCase for variables, PascalCase for components)
3. **File Organization**: One component per file
4. **Imports**: Group by external, internal, then styles
5. **Props**: Destructure props in function parameters

### Best Practices

1. **Error Handling**: Always use try-catch for async operations
2. **Loading States**: Show loading indicators during data fetching
3. **Form Validation**: Validate inputs before submission
4. **Responsive Design**: Test on multiple screen sizes
5. **Accessibility**: Use semantic HTML and ARIA labels

### Adding New Pages

1. Create a new file in `src/pages/`
2. Export a default function component
3. Add navigation link in sidebar components
4. Update routes if needed

Example:
```javascript
// src/pages/settings.js
import { useRouter } from 'next/router';

export default function SettingsPage() {
  const router = useRouter();
  
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}
```

### Adding New Components

1. Create a new file in `src/components/`
2. Export the component
3. Import where needed

Example:
```javascript
// src/components/badge.jsx
export function Badge({ children, variant = 'default' }) {
  return (
    <span className={`badge ${variant}`}>
      {children}
    </span>
  );
}
```

## 🐛 Debugging

### Common Issues

1. **API Connection Errors**
   - Check if backend is running
   - Verify API URL is correct
   - Check CORS configuration

2. **Authentication Errors**
   - Verify token is stored in localStorage
   - Check token expiration
   - Ensure auth-token header is sent

3. **Build Errors**
   - Clear `.next` folder and rebuild
   - Check for syntax errors
   - Verify all dependencies are installed

### Development Tools

- React Developer Tools (browser extension)
- Next.js built-in error overlay
- Browser console for debugging
- Network tab for API inspection

## 📱 Responsive Design

The application is responsive and works on:
- Desktop (1920px and above)
- Laptop (1024px to 1920px)
- Tablet (768px to 1024px)
- Mobile (below 768px)

### Breakpoints

Tailwind CSS breakpoints:
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🔒 Security Considerations

1. **Token Storage**: JWT in localStorage (consider httpOnly cookies for production)
2. **XSS Prevention**: React automatically escapes content
3. **Input Validation**: Validate on both client and server
4. **HTTPS**: Use HTTPS in production
5. **Environment Variables**: Use `.env.local` for sensitive data

### Production Checklist

- [ ] Update API URLs for production
- [ ] Enable error tracking (e.g., Sentry)
- [ ] Optimize images and assets
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure security headers
- [ ] Test all user flows
- [ ] Perform accessibility audit

## 📝 Dependencies

### Key Dependencies

- `next` - React framework
- `react` & `react-dom` - UI library
- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Accessible UI primitives
- `framer-motion` - Animation library
- `recharts` - Charting library
- `lucide-react` - Icon library
- `axios` - HTTP client
- `date-fns` - Date utilities

### Dev Dependencies

- `postcss` - CSS processing
- `tailwindcss` - Tailwind CSS

## 🤝 Contributing

When contributing to the frontend:

1. Follow the existing component structure
2. Use Tailwind CSS classes for styling
3. Ensure responsive design
4. Test on multiple browsers
5. Add JSDoc comments for complex functions
6. Update this README if adding new features

## 📄 License

This project is part of BLACKSITE and is licensed under the MIT License.

---

For backend documentation, see the [Backend README](../Backend/README.md)

For overall project documentation, see the [Main README](../README.md)
