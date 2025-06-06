import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
// import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { V1Service, type TestItem, type CreateTestItemRequest, type UpdateTestItemRequest } from '../../api';
import { client } from '../../api/client.gen';

@customElement('test-dashboard')
export class TestDashboardElement extends UmbElementMixin(LitElement) {
  @state()
  private _items: TestItem[] = [];

  @state()
  private _loading = false;

  @state()
  private _error: string | null = null;

  @state()
  private _showCreateForm = false;

  @state()
  private _editingItem: TestItem | null = null;

  @state()
  private _formData = {
    name: '',
    description: ''
  };

  #authInitPromise: Promise<void>;

  constructor() {
    super();
    // Create and store the initialization promise
    this.#authInitPromise = this.#initializeAuth();
  }

  async #initializeAuth(): Promise<void> {
    console.log("🔐 Starting auth initialization...");
    return new Promise(async (resolve) => {
      await this.consumeContext(UMB_AUTH_CONTEXT, async (_auth) => {
        const umbOpenApi = _auth.getOpenApiConfiguration();
        
        // Debug: Log the auth configuration
        console.log("🔍 Auth configuration:", {
          base: umbOpenApi.base,
          hasTokenFunction: typeof umbOpenApi.token === 'function',
          withCredentials: umbOpenApi.withCredentials
        });
        
        // Configure the API client with base URL
        // Remove any trailing /umbraco since our API paths already include the full path
        const baseUrl = umbOpenApi.base.replace(/\/umbraco\/?$/, '');
        console.log("🌐 Setting baseUrl to:", baseUrl);
        console.log("🌐 Original base:", umbOpenApi.base);
        
        // Try setting baseUrl to empty string since paths are absolute
        client.setConfig({
          baseUrl: '',
        });
        
        // Debug: Test the client configuration
        console.log("🔧 Client config after setup:", client.getConfig());
        
        // Test manual fetch to see if the issue is with the client
        try {
          const testUrl = `${baseUrl}/umbraco/mindburn/api/v1/items`;
          console.log("🧪 Testing manual fetch to:", testUrl);
          const token = await umbOpenApi.token();
          const testResponse = await fetch(testUrl, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log("🧪 Manual fetch response:", testResponse.status, testResponse.statusText);
        } catch (testError) {
          console.error("🧪 Manual fetch failed:", testError);
        }
        
        // Use interceptors to add the token dynamically for each request
        client.interceptors.request.use(async (request) => {
          const token = await umbOpenApi.token();
          console.log("🔑 Adding token to request:", token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
          console.log("🔗 Request URL:", request.url);
          console.log("🔍 Full request object:", request);
          console.log("🔍 Request URL type:", typeof request.url);
          
          if (token) {
            return {
              ...request,
              headers: {
                ...request.headers,
                'Authorization': `Bearer ${token}`,
              },
            };
          }
          
          return request;
        });
        
        console.log("🔐 Auth initialization complete");
        resolve();
      });
    });
  }

  static styles = css`
    :host {
      display: block;
      padding: var(--uui-size-layout-1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--uui-size-space-5);
    }

    .items-grid {
      display: grid;
      gap: var(--uui-size-space-4);
      margin-bottom: var(--uui-size-space-5);
    }

    .item-card {
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      padding: var(--uui-size-space-4);
      background: var(--uui-color-surface);
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--uui-size-space-2);
    }

    .item-actions {
      display: flex;
      gap: var(--uui-size-space-2);
    }

    .form-container {
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      padding: var(--uui-size-space-4);
      background: var(--uui-color-surface);
      margin-bottom: var(--uui-size-space-5);
    }

    .form-actions {
      display: flex;
      gap: var(--uui-size-space-2);
      margin-top: var(--uui-size-space-4);
    }

    .error {
      color: var(--uui-color-danger);
      margin-bottom: var(--uui-size-space-4);
    }

    .empty-state {
      text-align: center;
      padding: var(--uui-size-space-6);
      color: var(--uui-color-text-alt);
    }

    .loading {
      text-align: center;
      padding: var(--uui-size-space-4);
    }

    .form-field {
      margin-bottom: var(--uui-size-space-4);
    }

    uui-input,
    uui-textarea {
      width: 100%;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Wait for the controller host to be fully initialized
    setTimeout(() => this._loadItems(), 0);
  }

  private async _loadItems() {
    this._loading = true;
    this._error = null;

    try {
      // Wait for authentication to be initialized
      await this.#authInitPromise;
      
      console.log("🚀 Loading items using manual fetch...");
      
      // Get auth context for token
      const authContext = await this.getContext(UMB_AUTH_CONTEXT);
      const umbOpenApi = authContext.getOpenApiConfiguration();
      const token = await umbOpenApi.token();
      
      // Manual fetch since hey-api client has URL construction issues
      const response = await fetch('/umbraco/mindburn/api/v1/items', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("📊 Manual fetch response:", response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      this._items = data;
      console.log("✅ Items loaded successfully:", this._items);
    } catch (error) {
      console.error('💥 Failed to load items:', error);
      this._error = error instanceof Error ? error.message : `Failed to load items: ${JSON.stringify(error)}`;
    } finally {
      this._loading = false;
    }
  }

  private async _createItem() {
    if (!this._formData.name.trim()) {
      this._error = 'Name is required';
      return;
    }

    this._loading = true;
    this._error = null;

    try {
      // Wait for authentication to be initialized
      await this.#authInitPromise;
      
      const request: CreateTestItemRequest = {
        name: this._formData.name,
        description: this._formData.description
      };

      console.log("🚀 Creating item using manual fetch...");
      
      // Get auth context for token
      const authContext = await this.getContext(UMB_AUTH_CONTEXT);
      const umbOpenApi = authContext.getOpenApiConfiguration();
      const token = await umbOpenApi.token();
      
      // Manual fetch since hey-api client has URL construction issues
      const response = await fetch('/umbraco/mindburn/api/v1/items', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      
      console.log("📊 Manual fetch response:", response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("✅ Item created successfully:", data);
      await this._loadItems();
      this._resetForm();
    } catch (error) {
      console.error('💥 Failed to create item:', error);
      this._error = error instanceof Error ? error.message : 'Failed to create item';
    } finally {
      this._loading = false;
    }
  }

  private async _updateItem() {
    if (!this._editingItem || !this._formData.name.trim()) {
      this._error = 'Name is required';
      return;
    }

    this._loading = true;
    this._error = null;

    try {
      // Wait for authentication to be initialized
      await this.#authInitPromise;
      
      const request: UpdateTestItemRequest = {
        name: this._formData.name,
        description: this._formData.description
      };

      console.log("🚀 Updating item using direct API call...");
      const response = await V1Service.updateItem({
        path: { id: this._editingItem.id },
        body: request
      });

      if (response.error) {
        console.error('❌ API returned error:', response.error);
        throw new Error(`API Error: ${JSON.stringify(response.error, null, 2)}`);
      }

      console.log("✅ Item updated successfully:", response.data);
      await this._loadItems();
      this._resetForm();
    } catch (error) {
      console.error('💥 Failed to update item:', error);
      this._error = error instanceof Error ? error.message : 'Failed to update item';
    } finally {
      this._loading = false;
    }
  }

  private async _deleteItem(id: number) {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    this._loading = true;
    this._error = null;

    try {
      // Wait for authentication to be initialized
      await this.#authInitPromise;
      
      console.log("🚀 Deleting item using direct API call...");
      const response = await V1Service.deleteItem({
        path: { id: id }
      });

      if (response.error) {
        console.error('❌ API returned error:', response.error);
        throw new Error(`API Error: ${JSON.stringify(response.error, null, 2)}`);
      }

      console.log("✅ Item deleted successfully");
      await this._loadItems();
    } catch (error) {
      console.error('💥 Failed to delete item:', error);
      this._error = error instanceof Error ? error.message : 'Failed to delete item';
    } finally {
      this._loading = false;
    }
  }

  private _showCreateFormHandler() {
    this._showCreateForm = true;
    this._editingItem = null;
    this._formData = { name: '', description: '' };
  }

  private _editItem(item: TestItem) {
    this._editingItem = item;
    this._showCreateForm = true;
    this._formData = {
      name: item.name,
      description: item.description
    };
  }

  private _resetForm() {
    this._showCreateForm = false;
    this._editingItem = null;
    this._formData = { name: '', description: '' };
    this._error = null;
  }

  private _onNameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this._formData = { ...this._formData, name: target.value };
  }

  private _onDescriptionInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this._formData = { ...this._formData, description: target.value };
  }

  render() {
    return html`
      <div class="header">
        <h1>Test Section Dashboard</h1>
        <uui-button
          label="Create New Item"
          look="primary"
          @click=${this._showCreateFormHandler}
          ?disabled=${this._loading}
        >
          Create New Item
        </uui-button>
      </div>

      ${this._error ? html`<div class="error">${this._error}</div>` : nothing}

      ${this._showCreateForm ? this._renderForm() : nothing}

      ${this._loading ? html`<div class="loading">Loading...</div>` : nothing}

      ${this._items.length === 0 && !this._loading
        ? html`<div class="empty-state">No items found. Create your first item!</div>`
        : this._renderItems()}
    `;
  }

  private _renderForm() {
    return html`
      <div class="form-container">
        <h3>${this._editingItem ? 'Edit Item' : 'Create New Item'}</h3>
        
        <div class="form-field">
          <uui-label for="name" slot="label" required>Name</uui-label>
          <uui-input
            id="name"
            label="Name"
            .value=${this._formData.name}
            @input=${this._onNameInput}
            ?disabled=${this._loading}
          ></uui-input>
        </div>

        <div class="form-field">
          <uui-label for="description" slot="label">Description</uui-label>
          <uui-textarea
            id="description"
            label="Description"
            .value=${this._formData.description}
            @input=${this._onDescriptionInput}
            ?disabled=${this._loading}
          ></uui-textarea>
        </div>

        <div class="form-actions">
          <uui-button
            label=${this._editingItem ? 'Update' : 'Create'}
            look="primary"
            @click=${this._editingItem ? this._updateItem : this._createItem}
            ?disabled=${this._loading}
          >
            ${this._editingItem ? 'Update' : 'Create'}
          </uui-button>
          <uui-button
            label="Cancel"
            @click=${this._resetForm}
            ?disabled=${this._loading}
          >
            Cancel
          </uui-button>
        </div>
      </div>
    `;
  }

  private _renderItems() {
    return html`
      <div class="items-grid">
        ${this._items.map(item => html`
          <div class="item-card">
            <div class="item-header">
              <div>
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <small>Created: ${new Date(item.createdAt).toLocaleString()}</small>
                ${item.updatedAt ? html`<br><small>Updated: ${new Date(item.updatedAt).toLocaleString()}</small>` : nothing}
              </div>
              <div class="item-actions">
                <uui-button
                  label="Edit"
                  look="secondary"
                  @click=${() => this._editItem(item)}
                  ?disabled=${this._loading}
                >
                  Edit
                </uui-button>
                <uui-button
                  label="Delete"
                  look="secondary"
                  color="danger"
                  @click=${() => this._deleteItem(item.id)}
                  ?disabled=${this._loading}
                >
                  Delete
                </uui-button>
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

export default TestDashboardElement;