# {{ page.component.id }}

found in source at: {{ page.component.path }}

The component is exactly 2em tall.

{% capture_yaml categories %}
- url: design
  name: design
- url: collateral
  name: collateral
{% endcapture_yaml %}
{% assign variations = categories | map: 'name' %}

{% example resizable bodyStyle="padding: 1.3em 1.3em 7em 1.3em" variations=variations %}
  {% block base-PageTransition %}
  {% block root-PageHeader categories=categories %}
{% endexample %}