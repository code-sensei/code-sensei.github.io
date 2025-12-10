/**
 * Cheatsheets Data Layer
 * @description Functions for managing and retrieving cheatsheet data
 * Stores cheatsheets locally - can be extended to use Supabase later
 */

import type { Cheatsheet, CheatsheetCategory, CheatsheetFilters } from "@/types/cheatsheet";

/**
 * Sample cheatsheets data - add your cheatsheets here
 * @description This array stores all cheatsheet entries. Add new cheatsheets by
 * pushing objects that conform to the Cheatsheet interface.
 */
const cheatsheets: Cheatsheet[] = [
    // Example image-based cheatsheet
    {
        id: "1",
        title: "Git Commands Cheatsheet",
        slug: "git-commands",
        description: "Essential Git commands for everyday development workflow including branching, merging, and rebasing.",
        keywords: ["git", "version control", "commands", "branching", "merge", "rebase"],
        category: "Version Control",
        type: "image",
        imageUrl: "/cheatsheets/placeholder.svg",
        createdAt: "2025-01-15T10:00:00Z",
        sourceUrl: "https://example.com/git-cheatsheet",
        published: true,
    },
    // Example page-based cheatsheet (markdown content)
    {
        id: "2",
        title: "JavaScript Array Methods",
        slug: "javascript-array-methods",
        description: "Complete reference for JavaScript array methods including map, filter, reduce, and more.",
        keywords: ["javascript", "arrays", "methods", "map", "filter", "reduce", "es6"],
        category: "JavaScript",
        type: "page",
        content: `
# JavaScript Array Methods

## Iteration Methods

### map()
Creates a new array with the results of calling a function on every element.

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
// Result: [2, 4, 6, 8]
\`\`\`

### filter()
Creates a new array with all elements that pass the test.

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0);
// Result: [2, 4, 6]
\`\`\`

### reduce()
Reduces array to a single value by executing a reducer function.

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);
// Result: 10
\`\`\`

### forEach()
Executes a function once for each array element.

\`\`\`javascript
const fruits = ['apple', 'banana', 'cherry'];
fruits.forEach(fruit => console.log(fruit));
\`\`\`

## Search Methods

### find()
Returns the first element that satisfies the testing function.

\`\`\`javascript
const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
const user = users.find(u => u.id === 2);
// Result: {id: 2, name: 'Jane'}
\`\`\`

### findIndex()
Returns the index of the first element that satisfies the testing function.

\`\`\`javascript
const numbers = [10, 20, 30, 40];
const index = numbers.findIndex(num => num > 25);
// Result: 2
\`\`\`

### includes()
Determines whether an array contains a value.

\`\`\`javascript
const fruits = ['apple', 'banana', 'cherry'];
console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape')); // false
\`\`\`

## Transformation Methods

### slice()
Returns a shallow copy of a portion of an array.

\`\`\`javascript
const fruits = ['apple', 'banana', 'cherry', 'date'];
const citrus = fruits.slice(1, 3);
// Result: ['banana', 'cherry']
\`\`\`

### splice()
Changes array contents by removing/replacing elements.

\`\`\`javascript
const months = ['Jan', 'March', 'April'];
months.splice(1, 0, 'Feb');
// Result: ['Jan', 'Feb', 'March', 'April']
\`\`\`

### concat()
Merges two or more arrays.

\`\`\`javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = arr1.concat(arr2);
// Result: [1, 2, 3, 4]
\`\`\`

### flat()
Flattens nested arrays.

\`\`\`javascript
const nested = [1, [2, [3, [4]]]];
console.log(nested.flat(2));
// Result: [1, 2, 3, [4]]
\`\`\`

## Sorting Methods

### sort()
Sorts the elements of an array in place.

\`\`\`javascript
const numbers = [3, 1, 4, 1, 5, 9];
numbers.sort((a, b) => a - b);
// Result: [1, 1, 3, 4, 5, 9]
\`\`\`

### reverse()
Reverses the array in place.

\`\`\`javascript
const arr = [1, 2, 3];
arr.reverse();
// Result: [3, 2, 1]
\`\`\`
        `,
        createdAt: "2025-01-10T14:30:00Z",
        updatedAt: "2025-01-12T09:00:00Z",
        published: true,
    },
    {
        id: "3",
        title: "CSS Flexbox Guide",
        slug: "css-flexbox",
        description: "Visual guide to CSS Flexbox properties and alignment techniques.",
        keywords: ["css", "flexbox", "layout", "responsive", "alignment", "flex"],
        category: "CSS",
        type: "image",
        imageUrl: "/cheatsheets/placeholder.svg",
        createdAt: "2025-01-08T16:00:00Z",
        sourceUrl: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
        published: true,
    },
    {
        id: "4",
        title: "TypeScript Utility Types",
        slug: "typescript-utility-types",
        description: "Reference for TypeScript built-in utility types like Partial, Pick, Omit, and more.",
        keywords: ["typescript", "utility types", "generics", "partial", "pick", "omit", "record"],
        category: "TypeScript",
        type: "page",
        content: `# TypeScript Utility Types

## Partial<Type>
Makes all properties optional.

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }

const updateUser = (user: User, updates: Partial<User>) => {
  return { ...user, ...updates };
};
\`\`\`

## Required<Type>
Makes all properties required.

\`\`\`typescript
interface Config {
  theme?: string;
  debug?: boolean;
}

type RequiredConfig = Required<Config>;
// { theme: string; debug: boolean; }
\`\`\`

## Pick<Type, Keys>
Picks specific properties from a type.

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email: string;
  address: string;
}

type UserPreview = Pick<User, 'name' | 'email'>;
// { name: string; email: string; }
\`\`\`

## Omit<Type, Keys>
Removes specific properties from a type.

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>;
// { name: string; age: number; email: string; }
\`\`\`

## Record<Keys, Type>
Creates an object type with specific keys and value types.

\`\`\`typescript
type Role = 'admin' | 'user' | 'guest';

type RolePermissions = Record<Role, string[]>;
// { admin: string[]; user: string[]; guest: string[]; }

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};
\`\`\`

## Readonly<Type>
Makes all properties readonly.

\`\`\`typescript
interface Config {
  apiKey: string;
  endpoint: string;
}

const config: Readonly<Config> = {
  apiKey: 'abc123',
  endpoint: 'https://api.example.com'
};

// Error: Cannot assign to 'apiKey' because it is a read-only property
// config.apiKey = 'new-key';
\`\`\`

## ReturnType<Type>
Extracts the return type of a function.

\`\`\`typescript
function getUser() {
  return { name: 'John', age: 30 };
}

type User = ReturnType<typeof getUser>;
// { name: string; age: number; }
\`\`\`

## Parameters<Type>
Extracts parameter types as a tuple.

\`\`\`typescript
function createUser(name: string, age: number, active: boolean) {
  return { name, age, active };
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number, boolean]
\`\`\`

## NonNullable<Type>
Removes null and undefined from type.

\`\`\`typescript
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string
\`\`\`

## Extract<Type, Union>
Extracts types assignable to union.

\`\`\`typescript
type AllTypes = string | number | boolean | null;
type OnlyStringOrNumber = Extract<AllTypes, string | number>;
// string | number
\`\`\`

## Exclude<Type, ExcludedUnion>
Excludes types from union.

\`\`\`typescript
type AllTypes = string | number | boolean | null;
type WithoutNull = Exclude<AllTypes, null>;
// string | number | boolean
\`\`\`
        `,
        createdAt: "2025-01-05T11:00:00Z",
        published: true,
    },
    {
        id: "5",
        title: "Linear & Logistic Regression",
        slug: "linear-logistic-regression",
        description: "Comprehensive cheat sheet comparing different regression types in machine learning with code examples and associated functions.",
        keywords: ["machine learning", "regression", "linear regression", "logistic regression", "polynomial", "sklearn", "python", "data science", "ML"],
        category: "Machine Learning",
        type: "page",
        content: `# Linear & Logistic Regression Cheat Sheet

> Comparing different regression types for machine learning

---

## 📊 Regression Models

### Simple Linear Regression

**Purpose:** To predict a dependent variable based on one independent variable.

| Aspect | Details |
|--------|---------|
| **Pros** | Easy to implement, interpret, and efficient for small datasets |
| **Cons** | Not suitable for complex relationships; prone to underfitting |
| **Equation** | \`y = b₀ + b₁x\` |

\`\`\`python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X, y)
\`\`\`

---

### Polynomial Regression

**Purpose:** To capture nonlinear relationships between variables.

| Aspect | Details |
|--------|---------|
| **Pros** | Better at fitting nonlinear data compared to linear regression |
| **Cons** | Prone to overfitting with high-degree polynomials |
| **Equation** | \`y = b₀ + b₁x + b₂x² + ...\` |

\`\`\`python
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)
model = LinearRegression().fit(X_poly, y)
\`\`\`

---

### Multiple Linear Regression

**Purpose:** To predict a dependent variable based on multiple independent variables.

| Aspect | Details |
|--------|---------|
| **Pros** | Accounts for multiple factors influencing the outcome |
| **Cons** | Assumes a linear relationship between predictors and target |
| **Equation** | \`y = b₀ + b₁x₁ + b₂x₂ + ...\` |

\`\`\`python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X, y)  # X contains multiple features
\`\`\`

---

### Logistic Regression

**Purpose:** To predict probabilities of categorical outcomes.

| Aspect | Details |
|--------|---------|
| **Pros** | Efficient for binary classification problems |
| **Cons** | Assumes a linear relationship between independent variables and log-odds |
| **Equation** | \`log(p/(1-p)) = b₀ + b₁x₁ + ...\` |

\`\`\`python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X, y)
\`\`\`

---

## 🛠️ Associated Functions

### Data Preparation

#### train_test_split
Splits the dataset into training and testing subsets to evaluate the model's performance.

\`\`\`python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
\`\`\`

#### StandardScaler
Standardizes features by removing the mean and scaling to unit variance.

\`\`\`python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
\`\`\`

---

### Evaluation Metrics

#### log_loss
Calculates the logarithmic loss, a performance metric for classification models.

\`\`\`python
from sklearn.metrics import log_loss

loss = log_loss(y_true, y_pred_proba)
\`\`\`

#### mean_absolute_error (MAE)
Calculates the mean absolute error between actual and predicted values.

\`\`\`python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(y_true, y_pred)
\`\`\`

#### mean_squared_error (MSE)
Computes the mean squared error between actual and predicted values.

\`\`\`python
from sklearn.metrics import mean_squared_error

mse = mean_squared_error(y_true, y_pred)
\`\`\`

#### root_mean_squared_error (RMSE)
Calculates the root mean squared error, a commonly used metric for regression tasks.

\`\`\`python
from sklearn.metrics import mean_squared_error
import numpy as np

rmse = np.sqrt(mean_squared_error(y_true, y_pred))
\`\`\`

#### r2_score (R²)
Computes the R-squared value, indicating how well the model explains the variability of the target variable.

\`\`\`python
from sklearn.metrics import r2_score

r2 = r2_score(y_true, y_pred)
\`\`\`

---

## 📚 Quick Reference Table

| Metric | Use Case | Range |
|--------|----------|-------|
| **MAE** | Regression | 0 → ∞ (lower is better) |
| **MSE** | Regression | 0 → ∞ (lower is better) |
| **RMSE** | Regression | 0 → ∞ (lower is better) |
| **R²** | Regression | -∞ → 1 (higher is better) |
| **Log Loss** | Classification | 0 → ∞ (lower is better) |

---

## 👥 Credits

**Original Authors from IBM Skills Network:**
- Jeff Grossman
- Abhishek Gagneja

**Repurposed By:**
[Babangida Tsowa](https://btsowa.dev)
        `,
        createdAt: "2025-12-10T15:00:00Z",
        sourceUrl: "https://skills.network",
        published: true,
    },
];

/**
 * Get all published cheatsheets
 * @returns {Promise<Cheatsheet[]>} Array of published cheatsheets sorted by date (newest first)
 */
export async function getCheatsheets(): Promise<Cheatsheet[]> {
    return cheatsheets
        .filter(sheet => sheet.published)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get a single cheatsheet by slug
 * @param {string} slug - The URL slug of the cheatsheet
 * @returns {Promise<Cheatsheet | undefined>} The cheatsheet if found
 */
export async function getCheatsheetBySlug(slug: string): Promise<Cheatsheet | undefined> {
    return cheatsheets.find(sheet => sheet.slug === slug && sheet.published);
}

/**
 * Get a single cheatsheet by ID
 * @param {string} id - The unique ID of the cheatsheet
 * @returns {Promise<Cheatsheet | undefined>} The cheatsheet if found
 */
export async function getCheatsheetById(id: string): Promise<Cheatsheet | undefined> {
    return cheatsheets.find(sheet => sheet.id === id && sheet.published);
}

/**
 * Search and filter cheatsheets
 * @param {CheatsheetFilters} filters - Filter parameters
 * @returns {Promise<Cheatsheet[]>} Filtered array of cheatsheets
 */
export async function searchCheatsheets(filters: CheatsheetFilters): Promise<Cheatsheet[]> {
    let results = cheatsheets.filter(sheet => sheet.published);

    // Filter by search query (searches title, description, and keywords)
    if (filters.query) {
        const query = filters.query.toLowerCase();
        results = results.filter(sheet =>
            sheet.title.toLowerCase().includes(query) ||
            sheet.description.toLowerCase().includes(query) ||
            sheet.keywords.some(keyword => keyword.toLowerCase().includes(query)) ||
            sheet.category.toLowerCase().includes(query)
        );
    }

    // Filter by category
    if (filters.category && filters.category !== "All") {
        results = results.filter(sheet => sheet.category === filters.category);
    }

    // Filter by type
    if (filters.type && filters.type !== "all") {
        results = results.filter(sheet => sheet.type === filters.type);
    }

    // Sort by date (newest first)
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get all unique categories with counts
 * @returns {Promise<CheatsheetCategory[]>} Array of categories with counts
 */
export async function getCategories(): Promise<CheatsheetCategory[]> {
    const published = cheatsheets.filter(sheet => sheet.published);
    const categoryMap = new Map<string, number>();

    published.forEach(sheet => {
        const count = categoryMap.get(sheet.category) || 0;
        categoryMap.set(sheet.category, count + 1);
    });

    const categories: CheatsheetCategory[] = Array.from(categoryMap.entries()).map(([name, count], index) => ({
        id: `cat-${index}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        count,
    }));

    // Sort by count (descending) then name (ascending)
    return categories.sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.name.localeCompare(b.name);
    });
}

/**
 * Get all unique keywords from cheatsheets
 * @returns {Promise<string[]>} Array of unique keywords
 */
export async function getAllKeywords(): Promise<string[]> {
    const published = cheatsheets.filter(sheet => sheet.published);
    const keywordSet = new Set<string>();

    published.forEach(sheet => {
        sheet.keywords.forEach(keyword => keywordSet.add(keyword));
    });

    return Array.from(keywordSet).sort();
}

/**
 * Get total count of published cheatsheets
 * @returns {Promise<number>} Total count
 */
export async function getTotalCount(): Promise<number> {
    return cheatsheets.filter(sheet => sheet.published).length;
}

/**
 * Add a new cheatsheet (for future use)
 * @param {Omit<Cheatsheet, 'id' | 'createdAt'>} data - Cheatsheet data without auto-generated fields
 * @returns {Promise<Cheatsheet>} The created cheatsheet
 */
export async function addCheatsheet(data: Omit<Cheatsheet, 'id' | 'createdAt'>): Promise<Cheatsheet> {
    const newCheatsheet: Cheatsheet = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
    };
    cheatsheets.push(newCheatsheet);
    return newCheatsheet;
}

